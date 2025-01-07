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

export type ProductionElement = (typeof PRODUCTION_ELEMENTS)[number];

interface ProductionSelectProps {
  value: ProductionElement[];
  customElements: string[];
  onChange: (value: ProductionElement[], customElements: string[]) => void;
}

export function ProductionSelect({ value, customElements, onChange }: ProductionSelectProps) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (currentValue: ProductionElement) => {
    if (!value.includes(currentValue)) {
      onChange([...value, currentValue], customElements);
      setSearchValue("");
    }
  };

  const removeElement = (element: ProductionElement | string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const addCustomElement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (customInput.trim() && !customElements.includes(customInput.trim())) {
      onChange(value, [...customElements, customInput.trim()]);
      setCustomInput("");
      setOpen(false);
    }
  };

  const allElements = [...value, ...customElements];
  const filteredElements = PRODUCTION_ELEMENTS.filter((element) =>
    element.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between form-input-gradient text-foreground"
          type="button"
        >
          <div className="flex gap-2 items-center">
            <Music2 className="h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {allElements.length > 0 ? (
                allElements.map((element) => (
                  <Badge
                    key={element}
                    variant="secondary"
                    className="mr-1"
                  >
                    {element}
                    <Button
                      onClick={(e) => removeElement(element, e)}
                      className="ml-1 h-auto p-0 hover:bg-transparent"
                      variant="ghost"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
      <PopoverContent className="w-full p-0 glass-card">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search elements..." 
            value={searchValue}
            onValueChange={setSearchValue}
            className="form-input-gradient text-foreground"
          />
          <CommandEmpty className="text-foreground">No element found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            <div className="flex items-center gap-2 p-2">
              <Input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Add custom element..."
                className="h-8 form-input-gradient text-foreground"
              />
              <Button 
                size="sm"
                onClick={addCustomElement}
                type="button"
                className="h-8 button-gradient"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {filteredElements.map((element) => (
              <CommandItem
                key={element}
                value={element}
                onSelect={() => handleSelect(element)}
                className={cn(
                  "cursor-pointer text-foreground hover:bg-white/10",
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