import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProductionAdd = (element: ProductionElement) => {
    if (!value.includes(element)) {
      onChange([...value, element], customElements);
      setSearchTerm("");
      setIsDropdownOpen(false);
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

  const filteredElements = PRODUCTION_ELEMENTS.filter(
    (element) => 
      !value.includes(element) && 
      element.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="relative">
        <Input
          placeholder="Search production elements..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />

        {isDropdownOpen && searchTerm && filteredElements.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg">
            <ScrollArea className="max-h-[200px]">
              {filteredElements.map((element) => (
                <button
                  key={element}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => handleProductionAdd(element)}
                >
                  {element}
                </button>
              ))}
            </ScrollArea>
          </div>
        )}
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
    </div>
  );
}