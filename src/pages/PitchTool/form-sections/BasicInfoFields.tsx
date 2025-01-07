import { Control } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Music, ListMusic } from "lucide-react";
import { GenreSelect } from "@/components/PitchForm/GenreSelect";

interface BasicInfoFieldsProps {
  control: Control<PitchFormData>;
}

export function BasicInfoFields({ control }: BasicInfoFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Song Title</FormLabel>
            <FormControl>
              <div className="relative">
                <Music className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="glass-card border-white/10 text-foreground" 
                  placeholder="Enter song title" 
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
        name="artists"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Featured Artists</FormLabel>
            <FormControl>
              <div className="relative">
                <ListMusic className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="glass-card border-white/10 text-foreground" 
                  placeholder="Enter featured artists" 
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
        name="genres"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel className="text-foreground">Genres (up to 3)</FormLabel>
            <FormControl>
              <GenreSelect
                value={value}
                onChange={onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="target_playlist"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Target Playlist</FormLabel>
            <FormControl>
              <div className="relative">
                <ListMusic className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="glass-card border-white/10 text-foreground" 
                  placeholder="Enter target playlist" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}