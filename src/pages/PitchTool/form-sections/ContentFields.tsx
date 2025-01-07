import { Control } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Quote } from "lucide-react";

interface ContentFieldsProps {
  control: Control<PitchFormData>;
}

export function ContentFields({ control }: ContentFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="theme"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <FormLabel className="text-foreground">Song Theme/Story</FormLabel>
            </div>
            <FormControl>
              <Textarea
                className="glass-card border-white/10 text-foreground min-h-[100px]"
                placeholder="Describe the theme or story behind your song"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lyrics"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <Quote className="h-3.5 w-3.5 text-muted-foreground" />
              <FormLabel className="text-foreground">Notable Lyrics</FormLabel>
            </div>
            <FormControl>
              <Textarea
                className="glass-card border-white/10 text-foreground min-h-[100px]"
                placeholder="Share some notable lyrics from your song"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}