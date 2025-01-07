import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { GenreSelect } from "@/components/PitchForm/GenreSelect";
import { ProductionSelect } from "@/components/PitchForm/ProductionSelect";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Music,
  Users,
  FileText,
  Quote,
  User,
  ListMusic,
} from "lucide-react";

const PitchTool = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">DSTRO7 Pitch Tool</h1>
          <Button variant="ghost" onClick={logout} className="hover-glow">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Song Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Music className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9 glass-card border-white/10 text-foreground" 
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
                  control={form.control}
                  name="artists"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Featured Artists</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9 glass-card border-white/10 text-foreground" 
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
                  control={form.control}
                  name="genres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Genres (up to 3)</FormLabel>
                      <FormControl>
                        <GenreSelect
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetPlaylist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Target Playlist</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ListMusic className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9 glass-card border-white/10 text-foreground" 
                            placeholder="Enter target playlist" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Song Theme/Story</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            className="pl-9 glass-card border-white/10 text-foreground min-h-[100px]"
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
                  control={form.control}
                  name="lyrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Notable Lyrics</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Quote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            className="pl-9 glass-card border-white/10 text-foreground min-h-[100px]"
                            placeholder="Share some notable lyrics from your song"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productionElements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Production Details</FormLabel>
                      <FormControl>
                        <ProductionSelect
                          value={field.value}
                          customElements={form.watch("customProductionElements")}
                          onChange={(elements, customElements) => {
                            field.onChange(elements);
                            form.setValue("customProductionElements", customElements);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="artistBackground"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Artist Background</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            className="pl-9 glass-card border-white/10 text-foreground min-h-[100px]"
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

              <Button
                type="submit"
                className="w-full neon-border hover-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Pitch..." : "Create Pitch"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default PitchTool;