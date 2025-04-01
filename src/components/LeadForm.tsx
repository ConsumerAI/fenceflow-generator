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
import { supabase } from '@/lib/supabase';
import FenceCalculator, { CalculatorFormData } from './FenceCalculator';
import AddressAutocomplete from './AddressAutocomplete';
import { MapPin, Fence, Star } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15)
    .refine((val) => /^[\d\s\-()+ ]+$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  address: z.string().min(5, { message: 'Address is required' }),
  service_type: z.nativeEnum(ServiceType),
  preferred_timeline: z.enum(['ASAP', 'Within 1 Month', 'Within 3 Months', 'Just Researching'], {
    required_error: 'Please select your preferred timeline',
  }),
  message: z.string().optional(),
});

interface LeadFormProps {
  city?: string;
  variant?: 'default' | 'minimal';
  className?: string;
}

const LeadForm = ({ city = 'DFW', variant = 'default', className = '' }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [fenceDetails, setFenceDetails] = useState<{ 
    linear_feet?: number; 
    fence_material?: CalculatorFormData['fence_material'];
    estimatedCost?: { min: number; max: number };
  }>({});
  
  useEffect(() => {
    if (window.location.hash === '#quote') {
      setIsShaking(true);
      
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      preferred_timeline: undefined,
      service_type: variant === 'default' ? undefined : ServiceType.ResidentialFencing,
    },
  });

  const serviceType = form.watch('service_type');
  const isResidential = serviceType === ServiceType.ResidentialFencing;
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      console.log('Form submission started with data:', data);
      
      // Prepare the lead data
      const leadData: Lead = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || '',
        service_type: variant === 'default' ? data.service_type : ServiceType.ResidentialFencing,
        preferred_timeline: data.preferred_timeline,
        message: data.message || '',
        city: city,
      };
      
      // Add fence details if it's a residential project
      if (isResidential && fenceDetails && fenceDetails.estimatedCost) {
        leadData.linear_feet = Number(fenceDetails.linear_feet);
        leadData.fence_material = fenceDetails.fence_material;
        leadData["Estimated Cost Quote"] = `${formatPrice(fenceDetails.estimatedCost.min)} - ${formatPrice(fenceDetails.estimatedCost.max)}`;
      }

      console.log('Attempting to submit lead data:', leadData);
      
      const result = await supabase.submitLead(leadData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit lead');
      }

      // Clear form and show success message
      form.reset();
      setFenceDetails(null);
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: "Thank you for your interest! We'll be in touch shortly.",
        variant: "default",
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculate = useCallback((calculatorData: { 
    linear_feet: number; 
    fence_material: CalculatorFormData['fence_material'];
    estimatedCost: { min: number; max: number };
  }) => {
    console.log('Fence details updated:', calculatorData);
    setFenceDetails(calculatorData);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formClasses = `glass-card p-6 md:p-8 ${isShaking ? 'animate-shake' : ''} ${className}`;

  return (
    <div className={formClasses} id="quote">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Perfect Fence Awaits</h2>
        <p className="text-muted-foreground">
          Request a free, no-obligation quote for your {city} fence installation project.
        </p>
      </div>
      
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 text-center animate-fade-in">
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p>Your request has been received. One of our fence specialists will contact you within 24 hours to discuss your project.</p>
          <Button 
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => setIsSuccess(false)}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <AddressAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Property address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Residential Fencing">Residential Fencing</SelectItem>
                        <SelectItem value="Commercial Fencing">Commercial Fencing</SelectItem>
                        <SelectItem value="Athletic Courts and Sports Facilities">Athletic Courts and Sports Facilities</SelectItem>
                        <SelectItem value="Access Control">Access Control</SelectItem>
                        <SelectItem value="Automatic Gates">Automatic Gates</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isResidential && (
                <div className="mt-6 mb-6">
                  <FenceCalculator onCalculate={handleCalculate} />
                </div>
              )}
              
              {fenceDetails.estimatedCost && isResidential && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                  <p className="font-medium text-green-800">
                    Your estimated fence cost: {formatPrice(fenceDetails.estimatedCost.min)} – {formatPrice(fenceDetails.estimatedCost.max)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This estimate is included in your quote request.
                  </p>
                </div>
              )}
              
              <FormField
                control={form.control}
                name="preferred_timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Timeline</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you want your new fence?" />
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
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your vision for your perfect fence"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Transform My Property"}
              </Button>
              
              <div className="flex justify-center items-center gap-12 mt-4">
                <div className="flex flex-col items-center gap-1">
                  <Fence className="h-5 w-5 text-green-600" />
                  <span className="text-xs font-medium">Free Estimates</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Star className="h-5 w-5 text-green-600" />
                  <span className="text-xs font-medium">Serving Texas Since 2018</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                By submitting this form, you're one step closer to enjoying the privacy, security, and beauty a custom fence brings to your property.
              </p>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                By submitting this form, you consent to receive calls, texts, and emails about your fence request from a local fence provider. Your information is secure. Reply STOP to unsubscribe.{' '}
                <a 
                  href="/terms" 
                  className="text-green-600 hover:text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Terms
                </a>
              </p>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LeadForm;
