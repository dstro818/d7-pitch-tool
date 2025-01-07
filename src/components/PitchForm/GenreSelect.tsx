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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenreSelectProps {
  value: Genre[];
  onChange: (value: Genre[]) => void;
}

export function GenreSelect({ value = [], onChange }: GenreSelectProps) {
  const handleGenreChange = (genre: Genre, checked: boolean) => {
    if (checked && value.length < 3) {
      onChange([...value, genre]);
    } else if (!checked) {
      onChange(value.filter((g) => g !== genre));
    }
  };

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="grid grid-cols-2 gap-4">
        {GENRES.map((genre) => (
          <div key={genre} className="flex items-center space-x-2">
            <Checkbox
              id={genre}
              checked={value.includes(genre)}
              onCheckedChange={(checked) => 
                handleGenreChange(genre, checked as boolean)
              }
            />
            <label
              htmlFor={genre}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {genre}
            </label>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}