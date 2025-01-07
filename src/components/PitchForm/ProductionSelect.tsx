import React, { useMemo, useState } from "react";
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

export function ProductionSelect({ 
  value = [], 
  customElements = [], 
  onChange 
}: ProductionSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredElements = useMemo(() => {
    if (!searchValue) return PRODUCTION_ELEMENTS;
    return PRODUCTION_ELEMENTS.filter((element) =>
      element.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const handleSelect = (currentValue: ProductionElement) => {
    const newValue = [...value];
    const exists = newValue.includes(currentValue);

    if (exists) {
      onChange(newValue.filter((v) => v !== currentValue), customElements);
    } else {
      onChange([...newValue, currentValue], customElements);
    }

    setSearchValue("");
    setOpen(false);
  };

  const handleAddCustom = () => {
    if (!searchValue.trim()) return;
    onChange(value, [...customElements, searchValue.trim()]);
    setSearchValue("");
    setOpen(false);
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

  const allElements = [...value, ...customElements];

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
      <PopoverContent className="w-full p-0 bg-popover">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search elements..." 
            value={searchValue}
            onValueChange={setSearchValue}
            className="text-foreground"
          />
          <CommandEmpty className="text-foreground p-2">
            {searchValue && (
              <Button
                onClick={handleAddCustom}
                className="w-full justify-start"
                variant="ghost"
                type="button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add "{searchValue}"
              </Button>
            )}
          </CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {filteredElements.map((element) => (
              <CommandItem
                key={element}
                value={element}
                onSelect={() => handleSelect(element)}
                className={cn(
                  "cursor-pointer text-foreground hover:bg-accent",
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