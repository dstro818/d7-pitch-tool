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

export type Genre = (typeof GENRES)[number];

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value = [], onChange }: GenreSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredGenres = useMemo(() => {
    if (!searchValue) return GENRES;
    return GENRES.filter((genre) =>
      genre.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const handleSelect = (currentValue: Genre) => {
    const newValue = [...value];
    const exists = newValue.includes(currentValue);

    if (exists) {
      onChange(newValue.filter((v) => v !== currentValue));
    } else if (newValue.length < 3) {
      onChange([...newValue, currentValue]);
      setOpen(false);
    }
  };

  const handleAddCustom = () => {
    if (!searchValue.trim() || value.length >= 3) return;
    const customGenre = searchValue.trim() as Genre;
    if (!GENRES.includes(customGenre) && !value.includes(customGenre)) {
      onChange([...value, customGenre]);
      setSearchValue("");
      setOpen(false);
    }
  };

  const removeGenre = (genreToRemove: Genre, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(value.filter((genre) => genre !== genreToRemove));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between form-input-gradient text-foreground bg-popover hover:bg-accent/50"
          type="button"
        >
          <div className="flex gap-2 items-center">
            <Music className="h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {value.length > 0 ? (
                value.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="mr-1"
                  >
                    {genre}
                    <Button
                      onClick={(e) => removeGenre(genre, e)}
                      className="ml-1 h-auto p-0 hover:bg-transparent"
                      variant="ghost"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        side="bottom"
        sideOffset={5}
      >
        <Command className="bg-popover border rounded-lg shadow-md">
          <CommandInput 
            placeholder="Search genres..." 
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
            {filteredGenres.map((genre) => (
              <CommandItem
                key={genre}
                value={genre}
                onSelect={() => handleSelect(genre)}
                className={cn(
                  "cursor-pointer text-foreground hover:bg-accent",
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