import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Lead, ServiceType } from '@/lib/types';
import { supabase } from '@/lib/supabase';

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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      service_type: 'Residential Fencing',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const leadData: Lead = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        service_type: data.service_type,
        message: data.message || '',
        city,
      };
      
      const { success, error } = await supabase.submitLead(leadData);
      
      if (success) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Thank you for your inquiry!",
          description: "We'll contact you within 24 hours.",
        });
      } else {
        throw new Error(error || 'Failed to submit form');
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`glass-card p-6 md:p-8 ${className}`} id="quote">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Your Free Quote</h2>
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
                    <Input placeholder="Property address" {...field} />
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
              {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you're taking the first step toward your new fence installation.
              <br/>We specialize in new installations only – no repairs.
            </p>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LeadForm;
