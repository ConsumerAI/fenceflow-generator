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
import { MapPin } from 'lucide-react';

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
  service_type: z.enum(['Residential Fencing', 'Commercial Fencing', 'Sports Courts', 'Access Control', 'Automatic Gates']),
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
    },
  });

  const serviceType = form.watch('service_type');
  const isResidential = serviceType === 'Residential Fencing';
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      console.log('Form submission started with data:', data);
      
      // Prepare the lead data
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || '',
        service_type: variant === 'default' ? data.service_type : 'Residential Fencing',
        message: data.message || '',
        city: city,
        ...(isResidential && fenceDetails ? {
          linear_feet: Number(fenceDetails.linear_feet),
          fence_material: fenceDetails.fence_material,
          "Estimated Cost Quote": `${formatPrice(fenceDetails.estimatedCost.min)} - ${formatPrice(fenceDetails.estimatedCost.max)}`
        } : {})
      };

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
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Your Free Design Quote</h2>
        <p className="text-muted-foreground">
          {variant === 'default' 
            ? `Request a free, no-obligation quote for your ${city} fence installation project.`
            : 'Fill out this quick form and we\'ll contact you within 24 hours.'}
        </p>
      </div>
      
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 text-center animate-fade-in">
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p>Your request has been received. One of our fence specialists will contact you within 24 hours to discuss your project.</p>
          <Button 
            className="mt-4 bg-texas-terracotta hover:bg-texas-earth"
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
                        <SelectItem value="Sports Courts">Sports Courts</SelectItem>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project"
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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-medium text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Get Free Design Quote'
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you're taking the first step toward enhancing your property with a beautiful fence.
                <br/>We're excited to help transform your space!
              </p>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LeadForm;
