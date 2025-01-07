import React, { useState } from "react";
import { Genre } from "@/types/pitch";
import { GENRES } from "@/constants/pitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value = [], onChange }: GenreSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGenreRemove = (genre: Genre | string) => {
    onChange(value.filter((g) => g !== genre) as Genre[]);
  };

  const handleGenreAdd = (genre: Genre | string) => {
    if (value.length < 3 && !value.includes(genre)) {
      onChange([...value, genre] as Genre[]);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const filteredGenres = GENRES.filter(
    (genre) => 
      !value.includes(genre) && 
      genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showAddCustomOption = searchTerm.trim() && 
    !GENRES.some(genre => 
      genre.toLowerCase() === searchTerm.toLowerCase()
    ) &&
    !value.includes(searchTerm.trim() as Genre);

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

        {isDropdownOpen && searchTerm && (filteredGenres.length > 0 || showAddCustomOption) && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg">
            <ScrollArea className="max-h-[200px]">
              {filteredGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                  onClick={() => handleGenreAdd(genre)}
                  disabled={value.length >= 3}
                >
                  <span>{genre}</span>
                  <Plus className="h-4 w-4" />
                </button>
              ))}
              {showAddCustomOption && value.length < 3 && (
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between text-muted-foreground"
                  onClick={() => handleGenreAdd(searchTerm.trim())}
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