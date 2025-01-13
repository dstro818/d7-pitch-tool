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
import { useState } from "react";

export function PitchForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState<string>("");
  
  const form = useForm<PitchFormData>({
    defaultValues: {
      title: "",
      artists: "",
      genres: [],
      theme: "",
      lyrics: "",
      production_elements: [],
      custom_production_elements: [],
      artist_background: "",
      target_playlist: "",
    },
  });

  const formValues = form.watch();

  const generateAIPitch = async (data: PitchFormData, suggestions?: string) => {
    setIsGenerating(true);
    try {
      const { data: response, error } = await supabase.functions.invoke('generate-pitch', {
        body: { ...data, suggestions }
      });

      if (error) throw error;

      if (response?.suggestion) {
        // Validate character count
        if (response.suggestion.length > 500) {
          const truncated = response.suggestion.slice(0, 497) + "...";
          setGeneratedTheme(truncated);
          return truncated;
        }
        setGeneratedTheme(response.suggestion);
        return response.suggestion;
      }
    } catch (error) {
      console.error('Error generating pitch:', error);
      toast({
        title: "Error",
        description: "Failed to generate pitch. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: PitchFormData) => {
    try {
      setIsGenerating(true);
      
      // First generate the AI pitch
      const generatedPitch = await generateAIPitch(data);
      
      if (!generatedPitch) {
        toast({
          title: "Error",
          description: "Failed to generate pitch content. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Then save to database with the generated pitch
      const { error } = await supabase
        .from('pitches')
        .insert({
          ...data,
          theme: generatedPitch,
        });

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
    } finally {
      setIsGenerating(false);
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
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Pitch'}
          </Button>
        </form>
      </Form>

      <div className="lg:sticky lg:top-6 h-fit">
        <PitchPreview 
          data={{ ...formValues, theme: generatedTheme }}
          onRegenerate={generateAIPitch}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}