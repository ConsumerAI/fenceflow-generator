import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lead } from '@/lib/types';
import { ServiceType } from '@/lib/types';

export interface LeadFormProps {
  city?: string;
  variant?: 'default' | 'minimal';
  className?: string;
  serviceType?: ServiceType;
}

const LeadForm = ({ 
  city = 'DFW', 
  variant = 'default', 
  className = '', 
  serviceType 
}: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 digits.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    zip_code: z.string().min(5, {
      message: "Zip code must be at least 5 characters.",
    }),
    serviceType: z.nativeEnum(ServiceType, {
      invalid_type_error: "Please select a service type.",
    }),
    preferred_timeline: z.enum(['ASAP', 'Within 1 Month', 'Within 3 Months', 'Just Researching']),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: city,
      zip_code: "",
      serviceType: variant === 'default' 
        ? undefined 
        : serviceType || ServiceType.ResidentialFencing,
      preferred_timeline: 'ASAP',
      message: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        form.reset();
        setSubmissionResult({ success: true, message: 'Thank you! We will be in touch soon.' });
      } else {
        setSubmissionResult({ success: false, message: data.error || 'An error occurred. Please try again.' });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionResult({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
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
                <Input placeholder="555-123-4567" {...field} />
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
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Dallas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="75201" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ServiceType.ResidentialFencing}>{ServiceType.ResidentialFencing}</SelectItem>
                  <SelectItem value={ServiceType.CommercialFencing}>{ServiceType.CommercialFencing}</SelectItem>
                  <SelectItem value={ServiceType.AthleticCourts}>{ServiceType.AthleticCourts}</SelectItem>
                  <SelectItem value={ServiceType.AccessControl}>{ServiceType.AccessControl}</SelectItem>
                  <SelectItem value={ServiceType.AutomaticGates}>{ServiceType.AutomaticGates}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferred_timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Timeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timeline" />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Do you have any specific requirements or preferences?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        {submissionResult && (
          <div className={submissionResult.success ? "text-green-500" : "text-red-500"}>
            {submissionResult.message}
          </div>
        )}
      </form>
    </Form>
  );
};

export default LeadForm;
