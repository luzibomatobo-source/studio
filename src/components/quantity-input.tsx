"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantityInput = React.forwardRef<HTMLInputElement, QuantityInputProps>(
  ({ value, onChange, min = 1, max = 10 }, ref) => {
    const handleDecrement = () => {
      onChange(Math.max(min, value - 1));
    };

    const handleIncrement = () => {
      onChange(Math.min(max, value + 1));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value, 10);
        if (isNaN(newValue)) {
            newValue = min;
        }
        onChange(Math.max(min, Math.min(max, newValue)));
    }

    return (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          ref={ref}
          type="number"
          className="w-20 text-center text-lg font-bold"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    );
  }
);

QuantityInput.displayName = "QuantityInput";
