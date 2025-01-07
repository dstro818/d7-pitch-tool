import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Music2, X, Plus, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const PRODUCTION_ELEMENTS = [
  "Guitar", "Piano", "Drums", "Bass", "Violin", "Saxophone",
  "Synthesizer", "Trumpet", "Flute", "Cello", "Harmonica",
  "Percussion", "Vocals", "Electronic elements"
] as const;

export type ProductionElement = typeof PRODUCTION_ELEMENTS[number];

interface ProductionSelectProps {
  value: ProductionElement[];
  customElements: string[];
  onChange: (value: ProductionElement[], customElements: string[]) => void;
}

export function ProductionSelect({ value, customElements, onChange }: ProductionSelectProps) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleSelect = (currentValue: ProductionElement) => {
    if (!value.includes(currentValue)) {
      onChange([...value, currentValue], customElements);
    }
  };

  const removeElement = (element: ProductionElement | string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (PRODUCTION_ELEMENTS.includes(element as ProductionElement)) {
      onChange(
        value.filter((v) => v !== element),
        customElements
      );
    } else {
      onChange(
        value,
        customElements.filter((c) => c !== element)
      );
    }
  };

  const addCustomElement = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (customInput.trim() && !customElements.includes(customInput.trim())) {
      onChange(value, [...customElements, customInput.trim()]);
      setCustomInput("");
    }
  };

  const allElements = [...value, ...customElements];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <div className="flex gap-2 items-center">
            <Music2 className="h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {allElements.length > 0 ? (
                allElements.map((element) => (
                  <Badge
                    key={element}
                    variant="secondary"
                    className="mr-1 cursor-pointer hover:bg-secondary/80"
                  >
                    {element}
                    <button
                      onClick={(e) => removeElement(element, e)}
                      className="ml-1 hover:bg-secondary/80 rounded-full"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                "Select production elements..."
              )}
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search elements..." />
          <CommandEmpty>No element found.</CommandEmpty>
          <CommandGroup>
            <div className="flex items-center gap-2 p-2">
              <Input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Add custom element..."
                className="h-8"
              />
              <Button 
                size="sm"
                onClick={(e) => addCustomElement(e)}
                type="button"
                className="h-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {PRODUCTION_ELEMENTS.map((element) => (
              <CommandItem
                key={element}
                value={element}
                onSelect={() => handleSelect(element)}
                className={cn(
                  "cursor-pointer",
                  value.includes(element) && "opacity-50"
                )}
              >
                {element}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}