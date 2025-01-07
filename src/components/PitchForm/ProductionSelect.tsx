import { Check, Music2 } from "lucide-react";
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

  const addCustomElement = () => {
    if (customInput.trim() && !customElements.includes(customInput.trim())) {
      onChange(value, [...customElements, customInput.trim()]);
      setCustomInput("");
    }
  };

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
                {value.length === 0 && customElements.length === 0
                  ? "Select production elements..."
                  : [...value, ...customElements].map((element) => (
                      <Badge key={element} variant="secondary" className="mr-1">
                        {element}
                      </Badge>
                    ))}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search elements..." />
            <CommandEmpty>No element found.</CommandEmpty>
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
      <div className="flex gap-2">
        <Input
          placeholder="Add custom element..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomElement();
            }
          }}
        />
        <Button type="button" onClick={addCustomElement}>
          Add
        </Button>
      </div>
    </div>
  );
};