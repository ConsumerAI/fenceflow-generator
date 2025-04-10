import React, { useState, useEffect, useCallback } from 'react';
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
import FenceCalculator, { CalculatorFormData } from './FenceCalculator';
import AddressAutocomplete from './AddressAutocomplete';
import { MapPin, Fence, Star, ArrowRight, Lock, Calendar, Users } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { useRecaptcha } from '@/hooks/useRecaptcha';
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
interface LeadFormProps {
  city?: string;
  variant?: 'default' | 'minimal';
  className?: string;
  service_type?: ServiceType;
}
const LeadForm = ({
  city = 'DFW',
  variant = 'default',
  className = '',
  service_type
}: LeadFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [fenceDetails, setFenceDetails] = useState<{
    linear_feet?: number;
    fence_material?: CalculatorFormData['fence_material'];
    estimatedCost?: {
      min: number;
      max: number;
    };
  }>({});
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
      service_type: variant === 'default' ? undefined : service_type || ServiceType.ResidentialFencing,
      website: ''
    },
    mode: 'onSubmit'
  });
  const serviceType = form.watch('service_type');
  const isResidential = serviceType === ServiceType.ResidentialFencing;
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = form.getValues();
    if (currentStep === 1) {
      if (!values.zipCode || values.zipCode.length < 5) {
        form.setError('zipCode', {
          message: 'Valid ZIP code is required'
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!values.service_type || !values.preferred_timeline) {
        toast({
          title: "Required Fields",
          description: "Please fill in all required fields before continuing.",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (values.website) {
        console.log('Honeypot triggered - likely bot submission');
        return;
      }

      // Wait for reCAPTCHA to load if it hasn't already
      if (!isV3Loaded) {
        console.log('Waiting for reCAPTCHA to load...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Give it a chance to load
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

        // Wait for v2 response
        const maxAttempts = 30; // 30 seconds timeout
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
      const leadData: Lead = {
        name: submitData.name,
        email: submitData.email,
        phone: submitData.phone,
        address: submitData.address || '',
        service_type: variant === 'default' ? submitData.service_type : ServiceType.ResidentialFencing,
        preferred_timeline: submitData.preferred_timeline,
        message: submitData.message || '',
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
      form.reset();
      setFenceDetails(null);
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
  const handleCalculate = useCallback((calculatorData: {
    linear_feet: number;
    fence_material: CalculatorFormData['fence_material'];
    estimatedCost: {
      min: number;
      max: number;
    };
  }) => {
    setFenceDetails(calculatorData);
  }, []);
  const formClasses = `glass-card p-6 md:p-8 ${isShaking ? 'animate-shake' : ''} ${className} 
    bg-white bg-opacity-95 backdrop-blur-sm shadow-xl`;
  const buttonBaseClasses = "w-full bg-texas-terracotta hover:bg-texas-earth text-white flex items-center justify-center transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
  if (isSuccess) {
    return <div className={formClasses}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">🎯 SUCCESS! YOUR PERFECT CONTRACTOR MATCH IS ON THE WAY</h2>
          <p className="text-gray-600 mb-6">Your exclusive fence match is being arranged right now</p>
          <p className="text-gray-600 mb-6">We've already started connecting you with your dedicated fence specialist. They're being notified about your project as we speak!</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold mb-4">What happens next:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Expect a call within 24 hours from a local number (that's your new fence contractor!)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Your contractor will discuss your specific fence needs and provide a personalized quote</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>This is an exclusive match - we've carefully selected just one top-rated professional for your project (we don't pass your info to every contractor in the country like other sites 😊, don't you hate that?)</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold flex items-center mb-4">
            <span className="mr-2">💡</span>
            Why customers love our fence specialists:
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <span>Prompt service - 93% of our specialists respond within hours, not days</span>
            </li>
            <li className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <span>Quality craftsmanship - Average rating of 4.8/5 from verified customers</span>
            </li>
            <li className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <span>Fair pricing - No obligation, transparent quotes with no hidden fees</span>
            </li>
          </ul>
        </div>

        <div className="text-center text-gray-600">
          <p className="mb-2">Answer calls from local numbers in the next 24 hours - your dedicated fence specialist is eager to help with your project!</p>
          <p>We've also sent these details to your email for easy reference</p>
        </div>
      </div>;
  }
  return <>
      <div className={formClasses} id="quote">
        <div className="rounded-t-xl bg-texas-terracotta text-white p-6 -mx-6 -mt-6 md:-mx-8 md:-mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Your Perfect Fence Match™</h2>
          <p className="text-white/90">Takes only 15 seconds to complete</p>
        </div>
        
        <div className="-mx-6 md:-mx-8">
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4 mb-6">
          <Users className="h-4 w-4" />
          <span>7 people near you matched with their perfect contractors today</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormField control={form.control} name="zipCode" render={({
              field
            }) => <FormItem>
                      <FormLabel>What's your ZIP code?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ZIP code" {...field} />
                      </FormControl>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>Your ZIP code helps us find the best local match</span>
                        <MapPin className="h-4 w-4" />
                      </div>
                      <FormMessage />
                    </FormItem>} />
                <Button type="button" onClick={() => {
              const zipCode = form.getValues('zipCode');
              if (!zipCode || zipCode.length < 5) {
                form.setError('zipCode', {
                  message: 'Valid ZIP code is required'
                });
                return;
              }
              setCurrentStep(2);
            }} className={buttonBaseClasses}>
                  View Fence Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  🔒 100% Secure & Confidential
                </p>
              </>}

            {currentStep === 2 && <>
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
                      <div className="mt-2 text-sm text-muted-foreground">
                        We'll match you with specialists based on your exact project requirements
                      </div>
                      <FormMessage />
                    </FormItem>} />

                {isResidential && <FenceCalculator onCalculate={handleCalculate} />}

                <FormField control={form.control} name="preferred_timeline" render={({
              field
            }) => <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Preferred Timeline
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </FormLabel>
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
                        <Textarea placeholder="Tell us more about your project..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <Button type="button" onClick={() => {
              const values = form.getValues();
              if (!values.service_type || !values.preferred_timeline) {
                if (!values.service_type) {
                  form.setError('service_type', {
                    message: 'Please select a service type'
                  });
                }
                if (!values.preferred_timeline) {
                  form.setError('preferred_timeline', {
                    message: 'Please select your preferred timeline'
                  });
                }
                return;
              }
              setCurrentStep(3);
            }} className={buttonBaseClasses}>
                  Save Project & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-sm text-foreground mt-2">
                  ⚡ 86% of users complete this form once reaching this step - you're almost there!
                </p>
              </>}

            {currentStep === 3 && <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="phone" render={({
                field
              }) => <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>
                
                <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email address" {...field} />
                      </FormControl>
                      <div className="mt-1 text-sm text-muted-foreground">
                        No spam, ever. We Promise.
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
                      <FormMessage />
                    </FormItem>} />

                <Button type="button" onClick={async () => {
              const result = await form.handleSubmit(onSubmit)();
              if (!form.formState.errors || Object.keys(form.formState.errors).length === 0) {
                setIsSuccess(true);
              }
            }} disabled={isSubmitting} className={buttonBaseClasses}>
                  Secure the Best Contractor Now
                  <Lock className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-sm text-foreground mt-2">
                  ⏱️ Top contractors in your area typically book up within 24-48 hours
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
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex -space-x-3">
          
          
          
          
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">732+</span> homeowners matched this week
        </div>
      </div>
    </>;
};
export default LeadForm;