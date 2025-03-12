
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const calculatorSchema = z.object({
  linear_feet: z.string().min(1, 'Linear feet is required')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, 'Please enter a valid number'),
  fence_material: z.enum(['Wood', 'Iron', 'Vinyl', 'Chain Link']),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

interface FenceCalculatorProps {
  onCalculate: (data: CalculatorFormData) => void;
}

const FenceCalculator = ({ onCalculate }: FenceCalculatorProps) => {
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      linear_feet: '',
      fence_material: 'Wood',
    },
  });

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Calculate Fence Cost</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-4">
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
                    <SelectItem value="Wood">Wood</SelectItem>
                    <SelectItem value="Iron">Iron</SelectItem>
                    <SelectItem value="Vinyl">Vinyl</SelectItem>
                    <SelectItem value="Chain Link">Chain Link</SelectItem>
                  </SelectContent>
                </Select>
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
