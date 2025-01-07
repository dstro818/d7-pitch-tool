import React from "react";
import { Genre } from "@/types/pitch";
import { GENRES } from "@/constants/pitch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value = [], onChange }: GenreSelectProps) {
  const handleGenreAdd = (genre: Genre) => {
    if (value.length < 3 && !value.includes(genre)) {
      onChange([...value, genre]);
    }
  };

  const handleGenreRemove = (genre: Genre) => {
    onChange(value.filter((g) => g !== genre));
  };

  const availableGenres = GENRES.filter(genre => !value.includes(genre));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
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
      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="grid grid-cols-2 gap-4">
          {availableGenres.map((genre) => (
            <Button
              key={genre}
              type="button"
              variant="outline"
              className="justify-start"
              onClick={() => handleGenreAdd(genre)}
              disabled={value.length >= 3}
            >
              <Plus className="h-4 w-4 mr-2" />
              {genre}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}