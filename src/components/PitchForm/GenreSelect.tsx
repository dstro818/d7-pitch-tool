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
import { Music, X, Plus, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const GENRES = [
  "Adult Contemporary", "Alternative", "Alternative Rap", "Ambient", "Blues",
  "Breakbeat", "Children's Music", "Christmas", "Christian & Gospel", "Classical",
  "Country", "Dance", "Dancehall", "Electro House", "Electronic", "Electronica",
  "Experimental", "Folk", "Funk", "Hip-Hop/Rap", "Holiday", "House", "Indie Rock",
  "Jazz", "K-Pop", "Latin", "Metal", "New Age", "Pop", "Pop/Rock", "R&B/Soul",
  "Reggae", "Reggaeton", "Regional Mexicano", "Rock", "Salsa", "Singer/Songwriter",
  "Soft Rock", "Soundtrack", "Spoken Word", "Techno", "World"
] as const;

export type Genre = typeof GENRES[number] | string;

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value, onChange }: GenreSelectProps) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleSelect = (currentValue: string) => {
    if (value.length < 3 && !value.includes(currentValue)) {
      onChange([...value, currentValue]);
    }
  };

  const removeGenre = (genreToRemove: Genre, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onChange(value.filter((genre) => genre !== genreToRemove));
  };

  const addCustomGenre = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (
      customInput.trim() && 
      !value.includes(customInput.trim()) && 
      value.length < 3
    ) {
      onChange([...value, customInput.trim()]);
      setCustomInput("");
    }
  };

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
            <Music className="h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {value.length > 0 ? (
                value.map((genre) => (
                  <Badge
                    key={genre} 
                    variant="secondary" 
                    className="mr-1 cursor-pointer hover:bg-secondary/80"
                  >
                    {genre}
                    <button
                      onClick={(e) => removeGenre(genre, e)}
                      className="ml-1 hover:bg-secondary/80 rounded-full"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                "Select genres..."
              )}
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search genres..." />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandGroup>
            <div className="flex items-center gap-2 p-2">
              <Input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Add custom genre..."
                className="h-8"
              />
              <Button 
                size="sm"
                onClick={(e) => addCustomGenre(e)}
                disabled={value.length >= 3}
                type="button"
                className="h-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {GENRES.map((genre) => (
              <CommandItem
                key={genre}
                value={genre}
                onSelect={() => handleSelect(genre)}
                className={cn(
                  "cursor-pointer",
                  value.includes(genre) && "opacity-50"
                )}
              >
                {genre}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}