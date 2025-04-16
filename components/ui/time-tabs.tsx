"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type TimeOption = {
  label: string;
  value: string;
};

type TimeTabsProps = {
  options: TimeOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  buttonStyle?: "default" | "minimal";
};

const TimeTabs = ({
  options,
  defaultValue,
  onValueChange,
  buttonStyle = "default"
}: TimeTabsProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value);

  const handleValueChange = (value: string) => {
    if (value) {
      setSelectedValue(value);
      if (onValueChange) {
        onValueChange(value);
      }
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={selectedValue}
      onValueChange={handleValueChange}
      variant={buttonStyle === "minimal" ? "default" : "outline"}
      className={buttonStyle === "minimal" ? "justify-start" : ""}
    >
      {options.map((option) => (
        <ToggleGroupItem 
          key={option.value} 
          value={option.value} 
          aria-label={option.label}
          className={buttonStyle === "default" 
            ? "px-2 py-0.5 text-xs font-medium"
            : "px-4 text-xs font-medium"
          }
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export { TimeTabs };
export default TimeTabs; 