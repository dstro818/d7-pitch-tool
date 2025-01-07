import { Check, Music, Plus, X } from "lucide-react";
import { Genre, GENRES } from "@/types/pitch";
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

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export const GenreSelect = ({ value, onChange }: GenreSelectProps) => {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const toggleGenre = (genre: Genre) => {
    if (value.includes(genre)) {
      onChange(value.filter((v) => v !== genre));
    } else if (value.length < 3) {
      onChange([...value, genre]);
    }
  };

  const removeGenre = (genreToRemove: Genre) => {
    onChange(value.filter((genre) => genre !== genreToRemove));
  };

  const addCustomGenre = () => {
    if (
      customInput.trim() && 
      !value.includes(customInput.trim()) && 
      value.length < 3
    ) {
      onChange([...value, customInput.trim()]);
      setCustomInput("");
      setOpen(false);
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
              <Music className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {value.length === 0
                  ? "Select genres (up to 3)..."
                  : value.map((genre) => (
                      <Badge 
                        key={genre} 
                        variant="secondary" 
                        className="mr-1 cursor-pointer hover:bg-secondary/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGenre(genre);
                        }}
                      >
                        {genre}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search genres or add custom..." />
            <CommandEmpty>
              <div className="p-2">
                <div className="text-sm text-muted-foreground mb-2">
                  No genre found. Add custom genre:
                </div>
                <div className="flex gap-2">
                  <Input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom genre..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomGenre();
                      }
                    }}
                  />
                  <Button 
                    size="sm"
                    onClick={addCustomGenre}
                    disabled={value.length >= 3}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {GENRES.map((genre) => (
                <CommandItem
                  key={genre}
                  value={genre}
                  onSelect={() => toggleGenre(genre)}
                  disabled={value.length >= 3 && !value.includes(genre)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(genre) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {genre}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length >= 3 && (
        <p className="text-sm text-muted-foreground">
          Maximum of 3 genres selected
        </p>
      )}
    </div>
  );
};