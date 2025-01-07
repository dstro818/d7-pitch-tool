import { useForm } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./form-sections/BasicInfoFields";
import { ContentFields } from "./form-sections/ContentFields";
import { ProductionFields } from "./form-sections/ProductionFields";
import { PitchPreview } from "@/components/PitchForm/PitchPreview";
import { supabase } from "@/integrations/supabase/client";

export function PitchForm() {
  const { toast } = useToast();
  const form = useForm<PitchFormData>({
    defaultValues: {
      title: "",
      artists: "",
      genres: [],
      theme: "",
      lyrics: "",
      productionElements: [],
      customProductionElements: [],
      artistBackground: "",
      targetPlaylist: "",
    },
  });

  const formValues = form.watch();

  const handleRegenerate = async () => {
    try {
      const prompt = `Create a compelling pitch for a song titled "${formValues.title}" by ${formValues.artists || 'unknown artist'}. 
        Current theme: ${formValues.theme || 'none'}
        Current genres: ${formValues.genres.join(', ') || 'none'}
        Current production elements: ${[...formValues.productionElements, ...formValues.customProductionElements].join(', ') || 'none'}
        Please suggest improvements to make this pitch more engaging.`;

      const { data, error } = await supabase.functions.invoke('generate-pitch', {
        body: { prompt }
      });

      if (error) throw error;

      if (data.suggestion) {
        form.setValue('theme', data.suggestion);
        toast({
          title: "Pitch Enhanced",
          description: "AI suggestions have been applied to your pitch.",
        });
      }
    } catch (error) {
      console.error('Error generating pitch:', error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: PitchFormData) => {
    try {
      const { error } = await supabase
        .from('pitches')
        .insert([{
          ...data,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your pitch has been created.",
      });
    } catch (error) {
      console.error('Error saving pitch:', error);
      toast({
        title: "Error",
        description: "Failed to create pitch. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <BasicInfoFields control={form.control} />
          </div>
          <ContentFields control={form.control} />
          <ProductionFields 
            control={form.control} 
            setValue={form.setValue}
            watch={form.watch}
          />
          <Button
            type="submit"
            className="w-full neon-border hover-glow"
          >
            Create Pitch
          </Button>
        </form>
      </Form>

      <div className="lg:sticky lg:top-6 h-fit">
        <PitchPreview data={formValues} onRegenerate={handleRegenerate} />
      </div>
    </div>
  );
}