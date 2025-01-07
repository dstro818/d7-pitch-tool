import React from "react";
import { ProductionElement } from "@/types/pitch";
import { PRODUCTION_ELEMENTS } from "@/constants/pitch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  const [customInput, setCustomInput] = React.useState("");

  const handleProductionChange = (element: ProductionElement, checked: boolean) => {
    if (checked) {
      onChange([...value, element], customElements);
    } else {
      onChange(value.filter((e) => e !== element), customElements);
    }
  };

  const handleAddCustom = () => {
    if (customInput.trim() && !customElements.includes(customInput.trim())) {
      onChange(value, [...customElements, customInput.trim()]);
      setCustomInput("");
    }
  };

  const handleRemoveCustom = (element: string) => {
    onChange(value, customElements.filter((e) => e !== element));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add custom production element..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button"
          variant="outline"
          onClick={handleAddCustom}
          disabled={!customInput.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {customElements.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Custom Elements</div>
          <div className="grid grid-cols-2 gap-4">
            {customElements.map((element) => (
              <div key={element} className="flex items-center space-x-2">
                <Checkbox
                  id={`custom-${element}`}
                  checked={true}
                  onCheckedChange={(checked) => {
                    if (!checked) handleRemoveCustom(element);
                  }}
                />
                <label
                  htmlFor={`custom-${element}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {element}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTION_ELEMENTS.map((element) => (
            <div key={element} className="flex items-center space-x-2">
              <Checkbox
                id={element}
                checked={value.includes(element)}
                onCheckedChange={(checked) => 
                  handleProductionChange(element, checked as boolean)
                }
              />
              <label
                htmlFor={element}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {element}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}