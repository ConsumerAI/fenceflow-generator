
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceType } from '@/lib/types';
import { services } from '@/lib/routes';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface LeadFormProps {
  city?: string;
  service?: ServiceType;
  variant?: 'default' | 'minimal';
  className?: string;
}

const DEFAULT_MATERIAL = "Cedar (Most Common)";

const LeadForm = ({ 
  city = '', 
  service, 
  variant = 'default',
  className
}: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service_type: service || services[0],
    message: '',
    city: city,
    linear_feet: '',
    fence_material: DEFAULT_MATERIAL as "Cedar (Most Common)" | "Iron" | "Pipe" | "Pool Mesh" | "Economy (Pine)",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Supabase
      const { error } = await supabase.submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        service_type: formData.service_type,
        message: formData.message || '',
        city: formData.city,
        linear_feet: formData.linear_feet ? Number(formData.linear_feet) : undefined,
        fence_material: formData.fence_material,
      });
      
      if (error) {
        throw new Error(error);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service_type: service || services[0],
        message: '',
        city: city,
        linear_feet: '',
        fence_material: DEFAULT_MATERIAL as "Cedar (Most Common)" | "Iron" | "Pipe" | "Pool Mesh" | "Economy (Pine)",
      });
      
      // Show success message
      toast.success(
        "Quote request submitted successfully! We'll be in touch shortly.",
        {
          description: "Thank you for your interest in our services.",
        }
      );
    } catch (error) {
      console.error('Lead submission error:', error);
      toast.error(
        "There was a problem submitting your request.",
        {
          description: "Please try again or contact us directly.",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={cn(
        "p-6 md:p-8 rounded-xl bg-background border shadow-lg", 
        variant === 'minimal' ? 'glass-card' : '',
        className
      )}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4">
        {variant === 'minimal' 
          ? 'Request a Free Quote' 
          : 'Get Your Free Fence Installation Quote'}
      </h3>
      
      {variant === 'default' && (
        <p className="text-muted-foreground mb-6">
          Fill out the form below, and we'll provide you with a comprehensive fence installation quote tailored to your specific needs.
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, Dallas, TX"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Dallas"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type</Label>
            <Select 
              value={formData.service_type}
              onValueChange={(value) => handleSelectChange('service_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linear_feet">Approx. Linear Feet (Optional)</Label>
            <Input 
              id="linear_feet"
              name="linear_feet"
              type="number"
              value={formData.linear_feet}
              onChange={handleChange}
              placeholder="100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fence_material">Preferred Material</Label>
            <Select 
              value={formData.fence_material}
              onValueChange={(value) => handleSelectChange('fence_material', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cedar (Most Common)">Cedar (Most Common)</SelectItem>
                <SelectItem value="Iron">Iron</SelectItem>
                <SelectItem value="Pipe">Pipe</SelectItem>
                <SelectItem value="Pool Mesh">Pool Mesh</SelectItem>
                <SelectItem value="Economy (Pine)">Economy (Pine)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Additional Details</Label>
          <Textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please share any specific requirements or questions you have about your fence project."
            rows={4}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-texas-terracotta hover:bg-texas-earth text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get Your Free Quote'
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          By submitting this form, you agree to be contacted about our services. 
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
