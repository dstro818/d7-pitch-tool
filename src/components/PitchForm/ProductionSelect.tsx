import React, { useState } from "react";
import { ProductionElement } from "@/types/pitch";
import { PRODUCTION_ELEMENTS } from "@/constants/pitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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

  const handleCustomAdd = () => {
    if (searchTerm.trim() && !customElements.includes(searchTerm.trim())) {
      onChange(value, [...customElements, searchTerm.trim()]);
      setSearchTerm("");
      setIsDropdownOpen(false);
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

  const showAddCustomOption = searchTerm.trim() && 
    !PRODUCTION_ELEMENTS.some(element => 
      element.toLowerCase() === searchTerm.toLowerCase()
    ) &&
    !customElements.includes(searchTerm.trim());

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

        {isDropdownOpen && searchTerm && (filteredElements.length > 0 || showAddCustomOption) && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg">
            <ScrollArea className="max-h-[200px]">
              {filteredElements.map((element) => (
                <button
                  key={element}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                  onClick={() => handleProductionAdd(element)}
                >
                  <span>{element}</span>
                  <Plus className="h-4 w-4" />
                </button>
              ))}
              {showAddCustomOption && (
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between text-muted-foreground"
                  onClick={handleCustomAdd}
                >
                  <span>Add "{searchTerm}"</span>
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}