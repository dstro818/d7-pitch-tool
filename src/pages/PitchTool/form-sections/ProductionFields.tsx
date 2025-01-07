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
import { User } from "lucide-react";
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
        name="productionElements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Production Details</FormLabel>
            <FormControl>
              <ProductionSelect
                value={field.value}
                customElements={watch("customProductionElements")}
                onChange={(elements, customElements) => {
                  field.onChange(elements);
                  setValue("customProductionElements", customElements);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="artistBackground"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Artist Background</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  className="pl-9 glass-card border-white/10 text-foreground min-h-[100px] placeholder:text-left"
                  placeholder="Tell us about your background as an artist"
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