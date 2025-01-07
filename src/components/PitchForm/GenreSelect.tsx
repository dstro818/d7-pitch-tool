import React, { useState } from "react";
import { Genre } from "@/types/pitch";
import { GENRES } from "@/constants/pitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value = [], onChange }: GenreSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGenreRemove = (genre: Genre) => {
    onChange(value.filter((g) => g !== genre));
  };

  const handleGenreAdd = (genre: Genre) => {
    if (value.length < 3 && !value.includes(genre)) {
      onChange([...value, genre]);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const filteredGenres = GENRES.filter(
    (genre) => 
      !value.includes(genre) && 
      genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((genre) => (
          <Badge key={genre} variant="secondary" className="flex items-center gap-1">
            {genre}
            <button
              type="button"
              onClick={() => handleGenreRemove(genre)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="relative">
        <Input
          placeholder="Search genres..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />

        {isDropdownOpen && searchTerm && filteredGenres.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg">
            <ScrollArea className="max-h-[200px]">
              {filteredGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => handleGenreAdd(genre)}
                  disabled={value.length >= 3}
                >
                  {genre}
                </button>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}