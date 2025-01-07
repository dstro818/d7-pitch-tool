import { Check, Music } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export const GenreSelect = ({ value, onChange }: GenreSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleGenre = (genre: Genre) => {
    if (value.includes(genre)) {
      onChange(value.filter((v) => v !== genre));
    } else if (value.length < 3) {
      onChange([...value, genre]);
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
        >
          <div className="flex gap-2 items-center">
            <Music className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {value.length === 0
                ? "Select genres..."
                : value.map((genre) => (
                    <Badge key={genre} variant="secondary" className="mr-1">
                      {genre}
                    </Badge>
                  ))}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search genres..." />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {GENRES.map((genre) => (
              <CommandItem
                key={genre}
                value={genre}
                onSelect={() => toggleGenre(genre)}
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
  );
};