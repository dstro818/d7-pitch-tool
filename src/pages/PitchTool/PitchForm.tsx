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
import { useState, useEffect } from "react";

export function PitchForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [generatedTheme, setGeneratedTheme] = useState<string>("");
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

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
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to create a pitch.",
        variant: "destructive",
      });
      return;
    }

    try {
      // First generate the AI pitch
      const theme = await generateAIPitch(data);
      
      if (!theme) {
        throw new Error("Failed to generate pitch theme");
      }

      // Then save to database with the generated theme and user_id
      const { error } = await supabase
        .from('pitches')
        .insert({
          ...data,
          theme,
          user_id: userId
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
            disabled={isGenerating || !userId}
          >
            {isGenerating ? 'Generating...' : 'Create Pitch'}
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