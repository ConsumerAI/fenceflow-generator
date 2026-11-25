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
  fence_material: z.enum(['Cedar (Most Common)', 'Iron', 'Pipe', 'Pool Mesh', 'Economy (Pine)', 'Not sure yet']),
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

// "Not sure yet" material prices across the residential ladder instead of
// pretending to a single material: pine floor ($30/lf) to cedar ceiling
// ($90/lf), from the same rate card. The results copy says so in plain
// words, and the lead records the material as "Not sure yet".
const NOT_SURE_MATERIAL = 'Not sure yet';
const NOT_SURE_PRICING = { min: 30, max: 90 };

const GATE_PRICE = 500;
const DEFAULT_NUM_GATES = 2;

export interface CalculatorResult {
  linear_feet: number;
  fence_material: CalculatorFormData['fence_material'];
  estimatedCost: { min: number; max: number };
  // The visitor-entered gate count behind the estimate, so the lead form
  // can pin the full summary (footage, material, gates) at the contact
  // step. Display only: the lead payload is built from the fields above.
  num_gates: number;
}

interface FenceCalculatorProps {
  // null clears a previously reported estimate (footage removed, or the
  // visitor picked "Not sure" for footage), so a stale number can never
  // ride into a lead.
  onCalculate: (data: CalculatorResult | null) => void;
  // The page's own locked v5 estimate-results copy (screenBlock paras from
  // the wave data). When absent, the Dallas v5 block below is the fallback.
  bridgeParas?: string[] | null;
  // Advances the lead form when the bridge CTA is clicked. Falls back to
  // scrolling to the form when the calculator is used standalone.
  onBridgeCta?: () => void;
  // "Partial replacement" changes the footage question to the failing run.
  projectNeed?: string;
  // Reports the "Not sure" footage toggle so the lead form can show the
  // honest deferral line at the contact step instead of an estimate pin.
  onFeetUnknownChange?: (unknown: boolean) => void;
}

// Minimal inline renderer for the locked screen copy: **bold** segments,
// matching the wave content renderer's convention.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const FALLBACK_BRIDGE_PARAS = [
  '**That range is a planning number. Here is what it cannot see.**',
  'Your ballpark is built from the footage and material you entered, nothing else. What it cannot price is your yard: the gates you actually need, whether an old fence has to come out and be hauled off, and any required permit. Those three are where a ballpark and a real price part ways.',
  '**Want a firm price for your yard?** A local contractor will measure your fence line and give you a free, written quote that spells out gates, removal, and any required permit.',
  '**[Get my free fence quote]**',
  '*Your contractor will call within one business day to schedule your free measurement. No obligation.*',
];

const FenceCalculator = ({ onCalculate, bridgeParas, onBridgeCta, projectNeed, onFeetUnknownChange }: FenceCalculatorProps) => {
  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);
  const [feetUnknown, setFeetUnknown] = useState(false);
  const onCalculateRef = useRef(onCalculate);
  const hasEstimateRef = useRef(false);

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
  const materialNotSure = fenceMaterial === NOT_SURE_MATERIAL;

  useEffect(() => {
    const feetValue = Number(linearFeetString);
    const gatesValue = numGatesString && numGatesString.trim() !== '' ? Number(numGatesString) : 0;
    const gates = !isNaN(gatesValue) && gatesValue >= 0 ? gatesValue : 0;

    if (!feetUnknown && linearFeetString && !isNaN(feetValue) && feetValue > 0) {
      const materialPricing = materialNotSure ? NOT_SURE_PRICING : pricingData[fenceMaterial as keyof typeof pricingData];

      const minCost = (feetValue * materialPricing.min) + (gates * GATE_PRICE);
      const maxCost = (feetValue * materialPricing.max) + (gates * GATE_PRICE);

      setEstimatedCost({ min: minCost, max: maxCost });
      hasEstimateRef.current = true;

      // Use the ref to get the latest onCalculate function
      onCalculateRef.current({
        linear_feet: feetValue,
        fence_material: fenceMaterial,
        estimatedCost: { min: minCost, max: maxCost },
        num_gates: gates
      });
    } else {
      setEstimatedCost(null);
      if (hasEstimateRef.current) {
        hasEstimateRef.current = false;
        onCalculateRef.current(null);
      }
    }
  }, [linearFeetString, fenceMaterial, numGatesString, feetUnknown, materialNotSure]); // Removed onCalculate from dependencies

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBridgeCta = () => {
    if (onBridgeCta) {
      onBridgeCta();
    } else {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const paras = bridgeParas && bridgeParas.length > 0 ? bridgeParas : FALLBACK_BRIDGE_PARAS;

  const renderBridge = () => (
    <div className="mb-6 p-4 bg-white border border-secondary rounded-md">
      {paras.map((para, i) => {
        const buttonMatch = para.match(/^\*\*\[(.+)\]\*\*$/);
        if (buttonMatch) {
          return (
            <Button
              key={i}
              type="button"
              className="w-full sm:w-auto h-[48px] px-8 mt-4 bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
              onClick={handleBridgeCta}
            >
              {buttonMatch[1]}
            </Button>
          );
        }
        if (para.startsWith('*') && para.endsWith('*') && !para.startsWith('**')) {
          return (
            <p key={i} className="text-xs text-muted-foreground mt-3 italic">
              {para.slice(1, -1)}
            </p>
          );
        }
        const isFirst = i === 0;
        return (
          <p
            key={i}
            className={isFirst
              ? 'font-semibold text-foreground'
              : 'text-sm text-muted-foreground mt-3 leading-relaxed'}
          >
            {renderInline(para)}
          </p>
        );
      })}
    </div>
  );

  const isPartial = projectNeed === 'Partial replacement';

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-1">Estimate my fence cost</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Rough footage is fine. No phone number needed for the estimate.
      </p>

      {estimatedCost && (
        <>
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
            <p className="font-medium text-lg text-green-800">
              Estimated Cost: {formatPrice(estimatedCost.min)} – {formatPrice(estimatedCost.max)}
            </p>
            {materialNotSure ? (
              <p className="text-sm text-green-800 mt-1">
                Ballpark range for planning only, across the usual materials, pine to cedar, built from the footage and gate count you entered. Your contractor prices the exact material when he measures.
              </p>
            ) : (
              <p className="text-sm text-green-800 mt-1">
                Ballpark range for planning only, built from the footage, material, and gate count you entered.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Includes your footage and material, plus the gates you entered at $500 each. Does not include tear-out or haul-off of an old fence, or any required permit.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimate not final. Exact pricing requires an on-site appointment and measurements.
            </p>
          </div>

          {/* Estimate results bridge (locked v5 copy, claims item 3) */}
          {renderBridge()}
        </>
      )}

      {feetUnknown && (
        <div className="mb-6 p-4 bg-white border border-secondary rounded-md">
          <p className="text-sm text-muted-foreground leading-relaxed">
            No problem. Your contractor measures the fence line at the free visit, and your written quote is built from the real number, not a guess.
          </p>
        </div>
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
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
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
                <FormLabel>{isPartial ? 'Linear Feet of the Section to Replace' : 'Linear Feet'}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={isPartial ? 'Rough length of the failing section' : 'Enter linear feet'}
                    disabled={feetUnknown}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => {
                    const next = !feetUnknown;
                    setFeetUnknown(next);
                    onFeetUnknownChange?.(next);
                  }}
                  aria-pressed={feetUnknown}
                  className={`mt-2 text-sm underline underline-offset-2 ${feetUnknown ? 'text-texas-terracotta font-medium' : 'text-muted-foreground'}`}
                >
                  {feetUnknown ? 'Actually, I can enter a rough number' : 'Not sure? Skip it and let the contractor measure'}
                </button>
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
