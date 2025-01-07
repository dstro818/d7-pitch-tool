import { useForm } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./form-sections/BasicInfoFields";
import { ContentFields } from "./form-sections/ContentFields";
import { ProductionFields } from "./form-sections/ProductionFields";
import { PitchPreview } from "@/components/PitchForm/PitchPreview";
import { generatePitchSuggestions } from "@/utils/openai";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Wand2 } from "lucide-react";

export function PitchForm() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
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

  const handleEnhancePitch = async () => {
    try {
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please enter your OpenAI API key first.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem('openai_api_key', apiKey);
      
      const prompt = `Create a compelling pitch for a song titled "${formValues.title}" by ${formValues.artists || 'unknown artist'}. 
        Current theme: ${formValues.theme || 'none'}
        Current genres: ${formValues.genres.join(', ') || 'none'}
        Current production elements: ${[...formValues.productionElements, ...formValues.customProductionElements].join(', ') || 'none'}
        Please suggest improvements to make this pitch more engaging.`;

      const suggestions = await generatePitchSuggestions(prompt);

      if (suggestions.theme) {
        form.setValue('theme', suggestions.theme);
      }
      if (suggestions.genres) {
        form.setValue('genres', suggestions.genres);
      }
      if (suggestions.productionElements) {
        form.setValue('productionElements', suggestions.productionElements);
      }

      toast({
        title: "Pitch Enhanced",
        description: "AI suggestions have been applied to your pitch.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: PitchFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      toast({
        title: "Success!",
        description: "Your pitch has been created.",
      });
    } catch (error) {
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
          <div className="flex gap-4 items-center">
            <Input
              type="password"
              placeholder="Enter OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-grow"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleEnhancePitch}
              className="flex items-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              Enhance Pitch
            </Button>
          </div>
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
        <PitchPreview data={formValues} />
      </div>
    </div>
  );
}