import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { User, Settings } from "lucide-react";
import { ProductionSelect } from "@/components/PitchForm/ProductionSelect";

interface ProductionFieldsProps {
  control: Control<PitchFormData>;
  setValue: UseFormSetValue<PitchFormData>;
  watch: UseFormWatch<PitchFormData>;
}

export function ProductionFields({ control, setValue, watch }: ProductionFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="production_elements"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              <FormLabel className="text-foreground">Production Details</FormLabel>
            </div>
            <FormControl>
              <ProductionSelect
                value={field.value}
                customElements={watch("custom_production_elements")}
                onChange={(elements, customElements) => {
                  field.onChange(elements);
                  setValue("custom_production_elements", customElements);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="artist_background"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <FormLabel className="text-foreground">Artist Background</FormLabel>
            </div>
            <FormControl>
              <Textarea
                className="glass-card border-white/10 text-foreground min-h-[100px]"
                placeholder="Tell us about your background as an artist"
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