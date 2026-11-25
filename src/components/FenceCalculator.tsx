import React, { useState, useEffect, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// First, clearly define the schema with proper string to number conversion
const calculatorSchema = z.object({
  linear_feet: z.string().min(1, 'Linear feet is required')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, 'Please enter a valid number'),
  fence_material: z.enum(['Cedar (Most Common)', 'Iron', 'Pipe', 'Pool Mesh', 'Economy (Pine)']),
  // Gate count is visitor-entered (wave 1, claims item 3). The old build
  // silently assumed 2 gates in every estimate; the count is now labeled
  // and editable, defaulting to 2.
  num_gates: z.string()
    .transform((val) => (val.trim() === '' ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val >= 0 && val <= 20, 'Enter a gate count between 0 and 20'),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;

const pricingData = {
  'Cedar (Most Common)': { min: 50, max: 90 },
  'Iron': { min: 40, max: 60 },
  'Pipe': { min: 30, max: 45 },
  'Pool Mesh': { min: 25, max: 35 },
  'Economy (Pine)': { min: 30, max: 40 },
};

const GATE_PRICE = 500;
const DEFAULT_NUM_GATES = 2;

interface FenceCalculatorProps {
  onCalculate: (data: { 
    linear_feet: number; 
    fence_material: CalculatorFormData['fence_material'];
    estimatedCost: { min: number; max: number };
  }) => void;
}

const FenceCalculator = ({ onCalculate }: FenceCalculatorProps) => {
  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);
  const onCalculateRef = useRef(onCalculate);
  
  useEffect(() => {
    onCalculateRef.current = onCalculate;
  }, [onCalculate]);
  
  // Ensure the form uses string type for linear_feet as input
  const form = useForm<{
    linear_feet: string;
    fence_material: CalculatorFormData['fence_material'];
    num_gates: string;
  }>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      linear_feet: '',
      fence_material: 'Cedar (Most Common)',
      num_gates: String(DEFAULT_NUM_GATES),
    },
  });

  const linearFeetString = form.watch('linear_feet');
  const fenceMaterial = form.watch('fence_material');
  const numGatesString = form.watch('num_gates');

  useEffect(() => {
    const feetValue = Number(linearFeetString);
    const gatesValue = numGatesString && numGatesString.trim() !== '' ? Number(numGatesString) : 0;
    const gates = !isNaN(gatesValue) && gatesValue >= 0 ? gatesValue : 0;

    if (linearFeetString && !isNaN(feetValue) && feetValue > 0) {
      const materialPricing = pricingData[fenceMaterial];

      const minCost = (feetValue * materialPricing.min) + (gates * GATE_PRICE);
      const maxCost = (feetValue * materialPricing.max) + (gates * GATE_PRICE);
      
      setEstimatedCost({ min: minCost, max: maxCost });
      
      // Use the ref to get the latest onCalculate function
      onCalculateRef.current({
        linear_feet: feetValue,
        fence_material: fenceMaterial,
        estimatedCost: { min: minCost, max: maxCost }
      });
    } else {
      setEstimatedCost(null);
    }
  }, [linearFeetString, fenceMaterial, numGatesString]); // Removed onCalculate from dependencies

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
        <>
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
            <p className="font-medium text-lg text-green-800">
              Estimated Cost: {formatPrice(estimatedCost.min)} – {formatPrice(estimatedCost.max)}
            </p>
            <p className="text-sm text-green-800 mt-1">
              Ballpark range for planning only, built from the footage, material, and gate count you entered.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Includes your footage and material, plus the gates you entered at $500 each. Does not include tear-out or haul-off of an old fence, or any required permit.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimate not final. Exact pricing requires an on-site appointment and measurements.
            </p>
          </div>

          {/* Estimate results bridge (locked v5 copy, claims item 3) */}
          <div className="mb-6 p-4 bg-white border border-secondary rounded-md">
            <p className="font-semibold text-foreground">
              That range is a planning number. Here is what it cannot see.
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Your ballpark is built from the footage and material you entered, nothing else. What it cannot price is your yard: the gates you actually need, whether an old fence has to come out and be hauled off, and any required permit. Those three are where a ballpark and a real price part ways.
            </p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              <strong className="text-foreground">Want a firm price for your yard?</strong> A local contractor will measure your fence line and give you a free, written quote that spells out gates, removal, and any required permit.
            </p>
            <Button
              type="button"
              className="w-full sm:w-auto h-[48px] px-8 mt-4 bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Get my free fence quote
            </Button>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Your contractor will call within one business day to schedule your free measurement. No obligation.
            </p>
          </div>
        </>
      )}
      
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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

          <FormField
            control={form.control}
            name="num_gates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Gates</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    step={1}
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Counted in the estimate at $500 per gate. Most backyards need 2. Change it to match your yard.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default FenceCalculator;
