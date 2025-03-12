
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Define the calculator schema with proper types
const calculatorSchema = z.object({
  linear_feet: z.string().min(1, 'Linear feet is required')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, 'Please enter a valid number'),
  fence_material: z.enum(['Cedar (Most Common)', 'Iron', 'Pipe', 'Pool Mesh', 'Economy (Pine)']),
});

// Create a type from the schema
export type CalculatorFormData = z.infer<typeof calculatorSchema>;

// Pricing data
const pricingData = {
  'Cedar (Most Common)': { min: 45, max: 72 },
  'Iron': { min: 40, max: 60 },
  'Pipe': { min: 30, max: 45 },
  'Pool Mesh': { min: 25, max: 35 },
  'Economy (Pine)': { min: 30, max: 40 },
};

// Number of gates to include in estimate
const GATE_PRICE = 500;
const NUM_GATES = 2;

// Define the props with the type created from the schema
interface FenceCalculatorProps {
  onCalculate: (data: { 
    linear_feet: number; 
    fence_material: CalculatorFormData['fence_material'];
    estimatedCost: { min: number; max: number };
  }) => void;
}

const FenceCalculator = ({ onCalculate }: FenceCalculatorProps) => {
  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);
  
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      linear_feet: '',
      fence_material: 'Cedar (Most Common)',
    },
  });

  const linearFeet = form.watch('linear_feet');
  const fenceMaterial = form.watch('fence_material');

  // Calculate the estimated cost whenever linear feet or fence material changes
  useEffect(() => {
    if (linearFeet && !isNaN(Number(linearFeet)) && Number(linearFeet) > 0) {
      const feet = Number(linearFeet);
      const materialPricing = pricingData[fenceMaterial];
      
      // Calculate the range
      const minCost = (feet * materialPricing.min) + (NUM_GATES * GATE_PRICE);
      const maxCost = (feet * materialPricing.max) + (NUM_GATES * GATE_PRICE);
      
      setEstimatedCost({ min: minCost, max: maxCost });
    } else {
      setEstimatedCost(null);
    }
  }, [linearFeet, fenceMaterial]);

  // Handle form submission and ensure the linear_feet is passed as a number
  const handleSubmit = (data: CalculatorFormData) => {
    if (estimatedCost) {
      onCalculate({
        linear_feet: Number(data.linear_feet),
        fence_material: data.fence_material,
        estimatedCost
      });
    }
  };

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Calculate Fence Cost</h3>
      
      {estimatedCost && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
          <p className="font-medium text-lg text-green-800">
            Estimated Cost: {formatPrice(estimatedCost.min)} – {formatPrice(estimatedCost.max)}
          </p>
          <p className="text-xs text-green-700 mt-1">
            Includes {NUM_GATES} gates at {formatPrice(GATE_PRICE)}/gate
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Estimate not final—exact pricing requires an on-site appointment and measurements.
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fence_material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fence Material</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cedar (Most Common)">Cedar (Most Common)</SelectItem>
                    <SelectItem value="Iron">Iron</SelectItem>
                    <SelectItem value="Pipe">Pipe</SelectItem>
                    <SelectItem value="Pool Mesh">Pool Mesh</SelectItem>
                    <SelectItem value="Economy (Pine)">Economy (Pine)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linear_feet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linear Feet</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter linear feet"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="w-full bg-texas-terracotta hover:bg-texas-earth text-white"
          >
            Calculate Cost
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FenceCalculator;
