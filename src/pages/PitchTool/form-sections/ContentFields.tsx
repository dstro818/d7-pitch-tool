import { Control } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
            <FormDescription>
              Describe the theme, story, and significance of the song. Include key lyrics and their meaning, production elements, and artist background where relevant.
            </FormDescription>
            <FormControl>
              <div className="relative">
                <Textarea
                  className="glass-card border-white/10 text-foreground min-h-[100px]"
                  placeholder="Example: [Artist] teams up with [Collaborator] for [Song Title], a [description of style/theme] track about [main topic]. Lyrics like [notable lyrics] capture [emotional impact]. The song blends [musical elements] with [unique features], showcasing [artist qualities]."
                  maxLength={500}
                  {...field}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {field.value?.length || 0}/500
                </div>
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
            <div className="flex items-center gap-2 mb-2">
              <Quote className="h-3.5 w-3.5 text-muted-foreground" />
              <FormLabel className="text-foreground">Notable Lyrics</FormLabel>
            </div>
            <FormDescription>
              Share key lyrics that highlight the song's message or emotional impact.
            </FormDescription>
            <FormControl>
              <div className="relative">
                <Textarea
                  className="glass-card border-white/10 text-foreground min-h-[100px]"
                  placeholder="Enter notable lyrics that capture the essence of the song"
                  maxLength={500}
                  {...field}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {field.value?.length || 0}/500
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}