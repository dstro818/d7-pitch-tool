import { useForm } from "react-hook-form";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./form-sections/BasicInfoFields";
import { ContentFields } from "./form-sections/ContentFields";
import { ProductionFields } from "./form-sections/ProductionFields";

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
  );
}