import React from "react";
import { ProductionElement } from "@/types/pitch";
import { PRODUCTION_ELEMENTS } from "@/constants/pitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

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

  const handleProductionAdd = (element: ProductionElement) => {
    if (!value.includes(element)) {
      onChange([...value, element], customElements);
    }
  };

  const handleProductionRemove = (element: ProductionElement) => {
    onChange(value.filter((e) => e !== element), customElements);
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

  const availableElements = PRODUCTION_ELEMENTS.filter(element => !value.includes(element));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {value.map((element) => (
          <Badge key={element} variant="secondary" className="flex items-center gap-1">
            {element}
            <button
              type="button"
              onClick={() => handleProductionRemove(element)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {customElements.map((element) => (
          <Badge key={element} variant="secondary" className="flex items-center gap-1">
            {element}
            <button
              type="button"
              onClick={() => handleRemoveCustom(element)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

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

      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="grid grid-cols-2 gap-4">
          {availableElements.map((element) => (
            <Button
              key={element}
              type="button"
              variant="outline"
              className="justify-start"
              onClick={() => handleProductionAdd(element)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {element}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}