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
            <FormLabel className="text-foreground">Song Theme/Story</FormLabel>
            <FormControl>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  className="pl-9 glass-card border-white/10 text-foreground min-h-[100px] placeholder:text-left"
                  placeholder="Describe the theme or story behind your song"
                  {...field}
                />
              </div>
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
            <FormLabel className="text-foreground">Notable Lyrics</FormLabel>
            <FormControl>
              <div className="relative">
                <Quote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  className="pl-9 glass-card border-white/10 text-foreground min-h-[100px] placeholder:text-left"
                  placeholder="Share some notable lyrics from your song"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}