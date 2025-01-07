import { Check, Music2, Plus, X } from "lucide-react";
import { ProductionElement, PRODUCTION_ELEMENTS } from "@/types/pitch";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductionSelectProps {
  value: ProductionElement[];
  customElements: string[];
  onChange: (value: ProductionElement[], customElements: string[]) => void;
}

export const ProductionSelect = ({
  value,
  customElements,
  onChange,
}: ProductionSelectProps) => {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const toggleElement = (element: ProductionElement) => {
    if (value.includes(element)) {
      onChange(
        value.filter((v) => v !== element),
        customElements
      );
    } else {
      onChange([...value, element], customElements);
    }
  };

  const removeElement = (element: ProductionElement | string) => {
    if (PRODUCTION_ELEMENTS.includes(element as ProductionElement)) {
      onChange(
        value.filter((v) => v !== element),
        customElements
      );
    } else {
      onChange(
        value,
        customElements.filter((e) => e !== element)
      );
    }
  };

  const addCustomElement = () => {
    if (customInput.trim() && !customElements.includes(customInput.trim())) {
      onChange(value, [...customElements, customInput.trim()]);
      setCustomInput("");
      setOpen(false);
    }
  };

  const allElements = [...value, ...customElements];

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex gap-2 items-center">
              <Music2 className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {allElements.length === 0
                  ? "Select production elements..."
                  : allElements.map((element) => (
                      <Badge
                        key={element}
                        variant="secondary"
                        className="mr-1 cursor-pointer hover:bg-secondary/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeElement(element);
                        }}
                      >
                        {element}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search elements or add custom..." />
            <CommandEmpty>
              <div className="p-2">
                <div className="text-sm text-muted-foreground mb-2">
                  No element found. Add custom element:
                </div>
                <div className="flex gap-2">
                  <Input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom element..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomElement();
                      }
                    }}
                  />
                  <Button size="sm" onClick={addCustomElement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {PRODUCTION_ELEMENTS.map((element) => (
                <CommandItem
                  key={element}
                  value={element}
                  onSelect={() => toggleElement(element)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(element) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {element}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};