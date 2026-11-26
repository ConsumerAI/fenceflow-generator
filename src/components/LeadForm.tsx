import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Lead, ServiceType } from '@/lib/types';
import { supabase, supabaseInstance } from '@/lib/supabase';
import FenceCalculator, { CalculatorFormData, CalculatorResult } from './FenceCalculator';
import AddressAutocomplete from './AddressAutocomplete';
import { MapPin, Lock, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import ProgressBar from './ProgressBar';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import SocialProof from '@/components/SocialProof';
import StickyEstimateBar from './StickyEstimateBar';
import { trackEvent } from '@/lib/analytics';

// Conversion pass (Nov 25, 2026): the estimate is step 1, not a reward for
// finishing the form. Conversion round 3 (Nov 25, 2026) collapsed the old
// steps 2 and 3 into one final step. Flow is now:
//   Step 1: "What do you need?" chips + the calculator (residential) + ZIP.
//   Step 2: estimate pin, then name, phone, email, address (ZIP first,
//           address last, per the form addendum), then a project-details
//           accordion (service type, timeline, details), then submit.
// Owner ruling (Nov 25, 2026): the timeline is always the visitor's own
// choice. It is never preselected or defaulted, and it stays a required
// field. If a visitor tries to submit without picking one, the accordion
// opens to the timeline control and its error shows there, in place.
// The submission payload keys and the Supabase path are unchanged. The
// project-need answer rides in the existing message field as a labeled
// first line, so the lead record needs no new column.

const formSchema = z.object({
  zipCode: z.string().min(5, {
    message: 'Valid ZIP code is required'
  }),
  name: z.string().min(2, {
    message: 'Name is required'
  }),
  email: z.string().email({
    message: 'Valid email is required'
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits'
  }).max(15).refine(val => /^[\d\s\-()+ ]+$/.test(val), {
    message: 'Please enter a valid phone number'
  }),
  address: z.string().min(5, {
    message: 'Address is required'
  }),
  service_type: z.nativeEnum(ServiceType),
  preferred_timeline: z.enum(['ASAP', 'Within 1 Month', 'Within 3 Months', 'Just Researching'], {
    required_error: 'Please select your preferred timeline'
  }),
  message: z.string().optional(),
  website: z.string()
});

const PROJECT_NEEDS = ['New fence', 'Full replacement', 'Partial replacement', 'Not sure'] as const;
type ProjectNeed = typeof PROJECT_NEEDS[number];

interface LeadFormProps {
  city?: string;
  variant?: 'default' | 'minimal';
  className?: string;
  service_type?: ServiceType;
  // Wave pages pass their kind so courts pages get builder wording.
  pageKind?: 'residential' | 'courts';
  // The page's locked v5 screen copy (estimate results bridge on fence
  // pages, quote bridge on the courts page), from the wave data.
  screenParas?: string[] | null;
  // Conversion round 2: the hero instance on rebuilt wave pages renders
  // the sticky mobile estimate bar. Only one instance per page sets this.
  stickyBar?: boolean;
  // The bar's label: the page's own hero CTA text, passed from the wave
  // data so the bar speaks in the page's locked copy.
  stickyLabel?: string;
}

const LeadForm = ({
  city = 'DFW',
  variant = 'default',
  className = '',
  service_type,
  pageKind,
  screenParas,
  stickyBar,
  stickyLabel
}: LeadFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [projectNeed, setProjectNeed] = useState<ProjectNeed | null>(null);
  const [needError, setNeedError] = useState(false);
  const [fenceDetails, setFenceDetails] = useState<{
    linear_feet?: number;
    fence_material?: CalculatorFormData['fence_material'];
    estimatedCost?: {
      min: number;
      max: number;
    };
    num_gates?: number;
  }>({});
  // Mirrors the calculator's "Not sure" footage toggle, so the contact
  // step can pin the honest deferral line when there is no estimate.
  const [feetUnknown, setFeetUnknown] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const trackedEstimateRef = useRef(false);
  const trackedStartRef = useRef(false);
  // Conversion round 3: the project-details accordion on the final step.
  // It starts closed so the contact fields lead, and it opens on demand or
  // programmatically when a submit attempt is missing a required choice
  // inside it (timeline or service type), so the error is never hidden.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleDetailsOpenChange = (open: boolean) => {
    if (open && !detailsOpen) {
      trackEvent('details_accordion_open', { city });
    }
    setDetailsOpen(open);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const {
    executeV3,
    initV2,
    getV2Response,
    resetV2,
    showV2Captcha,
    setShowV2Captcha,
    isV3Loaded
  } = useRecaptcha();

  const [v2ContainerId] = useState(`recaptcha-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (showV2Captcha) {
      initV2(v2ContainerId);
    }
  }, [showV2Captcha, initV2, v2ContainerId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      preferred_timeline: undefined,
      // Default to residential when the page does not preset a service, so
      // the calculator is visible from the first step instead of hiding
      // behind a dropdown choice. Courts pages default to courts.
      service_type: service_type ?? (pageKind === 'courts' ? ServiceType.AthleticCourts : ServiceType.ResidentialFencing),
      website: ''
    },
    mode: 'onSubmit'
  });

  const serviceType = form.watch('service_type');
  const isResidential = serviceType === ServiceType.ResidentialFencing;
  const isCourts = pageKind === 'courts' || serviceType === ServiceType.AthleticCourts;

  // The chips and calculator belong to the residential flow. When the page
  // presets a non-residential service, step 1 is ZIP plus the quote bridge.
  const showResidentialTools = pageKind !== 'courts' && (!service_type || service_type === ServiceType.ResidentialFencing);

  const callLine = isCourts
    ? 'Your builder will call within one business day to schedule your free visit.'
    : 'Your contractor will call within one business day to schedule your free measurement.';
  const quoteCta = isCourts ? 'Get my free quote' : 'Get my free fence quote';
  const formTitle = isCourts
    ? 'Get my free court quote'
    : showResidentialTools
      ? 'Estimate my fence cost'
      : 'Get my free quote';
  const formSubtitle = isCourts
    ? 'Tell us about the yard and the game. No obligation.'
    : showResidentialTools
      ? 'Start with a ballpark for your yard. No phone number needed for the estimate.'
      : 'Tell us about the project. No obligation.';

  const handleCalculate = useCallback((calculatorData: CalculatorResult | null) => {
    if (calculatorData === null) {
      setFenceDetails({});
      return;
    }
    if (!trackedEstimateRef.current) {
      trackedEstimateRef.current = true;
      trackEvent('estimate_calculated', { city, service_type: 'Residential Fencing' });
    }
    setFenceDetails(calculatorData);
  }, [city]);

  const goToStep = (step: number) => {
    if (step > 1 && !trackedStartRef.current) {
      trackedStartRef.current = true;
      trackEvent('lead_form_start', { city });
    }
    setCurrentStep(step);
  };

  const validateStep1 = (): boolean => {
    const values = form.getValues();
    let ok = true;
    if (!values.zipCode || values.zipCode.length < 5) {
      form.setError('zipCode', {
        message: 'Valid ZIP code is required'
      });
      ok = false;
    }
    if (showResidentialTools && !projectNeed) {
      setNeedError(true);
      ok = false;
    }
    return ok;
  };

  // Conversion round 3: there is no step 2 gate anymore. Timeline and
  // service type validate at submit through the zod schema, exactly as
  // every other field does. If either is missing, open the accordion to
  // the control so the visitor sees the prompt where the choice lives.
  // The timeline is never filled in for them (owner ruling, Nov 25, 2026).
  const handleFinalSubmit = async () => {
    const values = form.getValues();
    if (!values.service_type || !values.preferred_timeline) {
      handleDetailsOpenChange(true);
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
    try {
      const result = await form.handleSubmit(onSubmit)();
      console.log('Form submission result:', result);
      if (!form.formState.errors || Object.keys(form.formState.errors).length === 0) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (values.website) {
        console.log('Honeypot triggered - likely bot submission');
        return;
      }

      if (!isV3Loaded) {
        console.log('Waiting for reCAPTCHA to load...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (!isV3Loaded) {
          throw new Error('reCAPTCHA failed to load. Please refresh the page and try again.');
        }
      }
      console.log('Executing reCAPTCHA v3...');
      const {
        token: v3Token,
        score
      } = await executeV3('lead_submission');
      console.log('reCAPTCHA v3 executed, score:', score);
      let v2Token = null;
      if (score < 0.5) {
        console.log('Low reCAPTCHA score, showing v2...');
        setShowV2Captcha(true);

        const maxAttempts = 30;
        let attempts = 0;
        while (!v2Token && attempts < maxAttempts) {
          v2Token = getV2Response();
          if (!v2Token) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
          }
        }
        if (!v2Token) {
          throw new Error('Please complete the reCAPTCHA verification to submit the form.');
        }
      }
      console.log('Verifying reCAPTCHA tokens...');
      const verifyResponse = await supabase.functions.invoke('verify-recaptcha', {
        body: {
          v3Token,
          v2Token
        }
      });
      if (verifyResponse.error) {
        console.error('Verification error:', verifyResponse.error);
        throw new Error('Security verification failed. Please try again.');
      }
      const verifyResult = verifyResponse.data;
      if (!verifyResult?.success) {
        console.error('Verification failed:', verifyResult);
        throw new Error('Security verification failed. Please try again.');
      }
      console.log('reCAPTCHA verified, preparing lead data...');
      const {
        website,
        ...submitData
      } = values;
      // The project-need answer rides in the existing message field as a
      // labeled first line. Payload keys are unchanged.
      const composedMessage = projectNeed
        ? [`Project type: ${projectNeed}.`, submitData.message || ''].filter(Boolean).join('\n')
        : (submitData.message || '');
      const leadData: Lead = {
        name: submitData.name,
        email: submitData.email,
        phone: submitData.phone,
        address: submitData.address || '',
        service_type: submitData.service_type,
        preferred_timeline: submitData.preferred_timeline,
        message: composedMessage,
        city: city,
        zip_code: submitData.zipCode,
        recaptcha_v3_token: v3Token,
        recaptcha_v3_score: verifyResult.score,
        recaptcha_v2_token: v2Token
      };
      if (isResidential && fenceDetails && fenceDetails.estimatedCost) {
        leadData.linear_feet = Number(fenceDetails.linear_feet);
        leadData.fence_material = fenceDetails.fence_material;
        leadData["Estimated Cost Quote"] = `${formatPrice(fenceDetails.estimatedCost.min)} - ${formatPrice(fenceDetails.estimatedCost.max)}`;
      }
      console.log('Submitting lead to Supabase...');
      const {
        success,
        error: submitError
      } = await supabaseInstance.submitLead(leadData);
      if (!success || submitError) {
        console.error('Lead submission error:', submitError);
        throw new Error(submitError || 'Failed to submit lead. Please try again.');
      }
      console.log('Lead submitted successfully!');
      trackEvent('generate_lead', {
        city,
        service_type: submitData.service_type,
        project_type: projectNeed ?? 'not specified'
      });
      form.reset();
      setFenceDetails({});
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive"
      });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 820);
    } finally {
      setIsSubmitting(false);
      if (showV2Captcha) {
        resetV2();
        setShowV2Captcha(false);
      }
    }
  };

  const formClasses = `glass-card p-6 md:p-8 ${isShaking ? 'animate-shake' : ''} ${className} 
    bg-white bg-opacity-95 backdrop-blur-sm shadow-xl`;

  const buttonBaseClasses = "w-full bg-texas-terracotta hover:bg-texas-earth text-white flex items-center justify-center transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  const stepLabels = ['Your estimate', 'Your details'];

  if (isSuccess) {
    return <div className={formClasses}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your request is in</h2>
          <p className="text-gray-600 mb-6">{callLine}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold mb-4">What happens next:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>{callLine} On that call he goes over your details and sets the time, nothing more.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>{isCourts
                ? 'He walks your yard, checks the footprint and access, and prices the whole project in writing, each part on its own line.'
                : 'He measures your fence line and gives you a free, written, itemized quote that spells out gates, removal, and any required permit.'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>The written number is yours to keep whether you build or not. You decide.</span>
            </li>
          </ul>
        </div>

        <div className="text-center text-gray-600">
          <p className="mb-2">No robocalls, no selling your number, no pressure to sign anything.</p>
          <p>Every matched contractor backs the work with a one-year workmanship warranty in writing.</p>
        </div>
      </div>;
  }

  // Courts pages have no calculator, so their locked quote bridge copy
  // renders in step 1 where the estimate would sit.
  const renderCourtsBridge = () => {
    if (!screenParas || screenParas.length === 0) return null;
    return (
      <div className="p-4 bg-white border border-secondary rounded-md">
        {screenParas.map((para, i) => {
          if (para.startsWith('*') && para.endsWith('*') && !para.startsWith('**')) {
            return (
              <p key={i} className="text-xs text-muted-foreground mt-3 italic">
                {para.slice(1, -1)}
              </p>
            );
          }
          const text = para.replace(/\*\*([^*]+)\*\*/g, '$1');
          return (
            <p key={i} className={i === 0 ? 'text-sm text-muted-foreground leading-relaxed' : 'text-sm text-muted-foreground mt-3 leading-relaxed'}>
              {text}
            </p>
          );
        })}
      </div>
    );
  };

  // Estimate summary pin (conversion round 2): at the contact step, the
  // visitor's own numbers stay in view above the highest-friction fields.
  // Built only from their calculator inputs; when they picked "Not sure"
  // for footage there is no range to pin, so the pin carries the same
  // honest deferral line the calculator showed them.
  const pinGates = fenceDetails.num_gates ?? 0;
  const pinGatesText = pinGates === 0
    ? 'with no gates counted'
    : pinGates === 1
      ? 'with 1 gate counted at $500'
      : `with ${pinGates} gates counted at $500 each`;
  const pinDetailLine = fenceDetails.estimatedCost
    ? fenceDetails.fence_material === 'Not sure yet'
      ? `For ${fenceDetails.linear_feet} ft, priced across the usual materials, pine to cedar, ${pinGatesText}. Your contractor prices the exact material when he measures.`
      : `For ${fenceDetails.linear_feet} ft of ${fenceDetails.fence_material}, ${pinGatesText}.`
    : null;
  const showPin = isResidential && (Boolean(fenceDetails.estimatedCost) || feetUnknown);

  return <>
      <div className={formClasses} id="quote" ref={formRef} data-lead-form="true">
        <div className="rounded-t-xl bg-texas-terracotta text-white p-6 -mx-6 -mt-6 md:-mx-8 md:-mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{formTitle}</h2>
          <p className="text-white/90">{formSubtitle}</p>
        </div>

        <div className="-mx-6 md:-mx-8">
          <ProgressBar currentStep={currentStep} totalSteps={2} />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 mb-6">
          Step {currentStep} of 2: {stepLabels[currentStep - 1]}
        </p>

        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <FormField control={form.control} name="website" render={({
              field
            }) => <FormItem>
                    <FormControl>
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </FormControl>
                  </FormItem>} />
            </div>

            {currentStep === 1 && <>
                {showResidentialTools && <>
                  <div>
                    <p className="text-sm font-medium leading-none mb-3">What do you need?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PROJECT_NEEDS.map(need => (
                        <button
                          key={need}
                          type="button"
                          aria-pressed={projectNeed === need}
                          onClick={() => { setProjectNeed(need); setNeedError(false); }}
                          className={`h-[48px] px-3 rounded-md border text-sm font-medium transition-colors ${
                            projectNeed === need
                              ? 'bg-texas-terracotta text-white border-texas-terracotta'
                              : 'bg-white text-foreground border-input hover:border-texas-terracotta'
                          }`}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                    {needError && <p className="text-sm font-medium text-destructive mt-2">Pick the one closest to your project. You can sort out the details on the call.</p>}
                  </div>

                  <FenceCalculator
                    onCalculate={handleCalculate}
                    bridgeParas={screenParas}
                    onBridgeCta={() => { if (validateStep1()) goToStep(2); }}
                    projectNeed={projectNeed ?? undefined}
                    onFeetUnknownChange={setFeetUnknown}
                  />
                </>}

                {!showResidentialTools && renderCourtsBridge()}

                <FormField control={form.control} name="zipCode" render={({
              field
            }) => <FormItem>
                      <FormLabel>What's your ZIP code?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ZIP code" inputMode="numeric" autoComplete="postal-code" {...field} />
                      </FormControl>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>Your ZIP routes your request to the contractor who covers your area</span>
                        <MapPin className="h-4 w-4 shrink-0" />
                      </div>
                      <FormMessage />
                    </FormItem>} />
                <Button type="button" onClick={() => { if (validateStep1()) goToStep(2); }} className={buttonBaseClasses}>
                  {quoteCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  🔒 100% Secure & Confidential
                </p>
              </>}

            {currentStep === 2 && <>
                {showPin && (
                  <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                    {fenceDetails.estimatedCost ? (
                      <>
                        <p className="font-medium text-lg text-green-800">
                          Your ballpark: {formatPrice(fenceDetails.estimatedCost.min)} – {formatPrice(fenceDetails.estimatedCost.max)}
                        </p>
                        {pinDetailLine && <p className="text-sm text-green-800 mt-1">{pinDetailLine}</p>}
                        <p className="text-xs text-muted-foreground mt-2">
                          Includes your footage and material, plus the gates you entered at $500 each. Does not include tear-out or haul-off of an old fence, or any required permit.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {callLine} No obligation.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-green-800 leading-relaxed">
                          No problem. Your contractor measures the fence line at the free visit, and your written quote is built from the real number, not a guess.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {callLine} No obligation.
                        </p>
                      </>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" autoComplete="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="phone" render={({
                field
              }) => <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" autoComplete="tel" {...field} />
                        </FormControl>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Your contractor calls this number to schedule the measurement. No robocalls, and we never sell your number.
                        </div>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email address" autoComplete="email" {...field} />
                      </FormControl>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Your written quote goes here. No spam, ever.
                      </div>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="address" render={({
              field
            }) => <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <AddressAutocomplete value={field.value} onChange={field.onChange} placeholder="Property address" />
                      </FormControl>
                      <div className="mt-1 text-sm text-muted-foreground">
                        So the contractor measures the right yard. Your ZIP already routed the request; the address is only for scheduling the visit.
                      </div>
                      <FormMessage />
                    </FormItem>} />

                <div ref={detailsRef}>
                  <Collapsible open={detailsOpen} onOpenChange={handleDetailsOpenChange}>
                    <CollapsibleTrigger asChild>
                      <button type="button" className="w-full flex items-center justify-between rounded-md border border-input bg-white px-4 py-3 text-left hover:border-texas-terracotta transition-colors" aria-expanded={detailsOpen}>
                        <span>
                          <span className="block text-sm font-medium">Project details and timeline</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">Your timeline is required. The rest helps your contractor prepare.</span>
                        </span>
                        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <FormField control={form.control} name="service_type" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={value => {
                      field.onChange(value);
                      form.clearErrors('service_type');
                    }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(ServiceType).map(type => <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="preferred_timeline" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Preferred Timeline</FormLabel>
                            <Select onValueChange={value => {
                      field.onChange(value);
                      form.clearErrors('preferred_timeline');
                    }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ASAP">ASAP</SelectItem>
                                <SelectItem value="Within 1 Month">Within 1 Month</SelectItem>
                                <SelectItem value="Within 3 Months">Within 3 Months</SelectItem>
                                <SelectItem value="Just Researching">Just Researching</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="message" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Project Details (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={projectNeed === 'Partial replacement'
                                  ? 'Which side is failing? Anything else your contractor should know?'
                                  : 'Anything your contractor should know? A gate that sticks, a dog, an HOA letter, it all helps.'}
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <Button type="button" onClick={handleFinalSubmit} disabled={isSubmitting} className={buttonBaseClasses}>
                  {quoteCta}
                  <Lock className="ml-2 h-4 w-4" />
                </Button>
                <button type="button" onClick={() => setCurrentStep(1)} className="w-full text-sm text-muted-foreground underline underline-offset-2 flex items-center justify-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Back to your estimate
                </button>

                <p className="text-center text-sm text-foreground mt-2">
                  Free. No obligation. {callLine}
                </p>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  By submitting this form, you consent to receive calls, texts, and emails about your fence request from a local fence provider. Your information is secure. Reply STOP to unsubscribe.{' '}
                  <a href="/terms-and-conditions" className="underline hover:text-texas-terracotta">
                    View Full Terms
                  </a>
                </p>
              </>}

            {showV2Captcha && <div className="flex justify-center my-4">
                <div id={v2ContainerId}></div>
              </div>}
          </form>
        </Form>
      </div>
      <div className="mt-4">
        <SocialProof />
      </div>
      {stickyBar && (
        <StickyEstimateBar
          label={stickyLabel ?? (isCourts ? 'Get my free fence quote' : 'Estimate my fence cost')}
          city={city}
          formRef={formRef}
        />
      )}
    </>;
};

export default LeadForm;
