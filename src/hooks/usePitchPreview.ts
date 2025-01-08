import { useState } from "react";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";

export function usePitchPreview(data: Partial<PitchFormData>, onRegenerate?: (data: PitchFormData, suggestions?: string) => void) {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState("");
  const [hasGeneratedPitch, setHasGeneratedPitch] = useState(false);

  const formatPitchText = () => {
    const parts = [];
    
    if (data.title) {
      if (data.artists) {
        parts.push(`${data.title} - ${data.artists}`);
      } else {
        parts.push(data.title);
      }
    }
    
    if (data.genres && data.genres.length > 0) {
      parts.push(data.genres.join(', '));
    }
    
    // Only include AI-generated theme in preview
    if (data.theme && hasGeneratedPitch) {
      parts.push(data.theme);
    }
    
    if (data.production_elements?.length > 0 || data.custom_production_elements?.length > 0) {
      const elements = [...(data.production_elements || []), ...(data.custom_production_elements || [])];
      if (elements.length > 0) {
        parts.push(`Featuring ${elements.join(', ')}.`);
      }
    }
    
    if (data.lyrics) {
      parts.push(`Notable lyrics: "${data.lyrics}"`);
    }
    
    if (data.artist_background) {
      parts.push(data.artist_background);
    }
    
    const text = parts.join(' ');
    return text.slice(0, 500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatPitchText());
      toast({
        title: "Copied!",
        description: "Pitch text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([formatPitchText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "pitch.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Exported!",
      description: "Pitch exported as text file",
    });
  };

  const handleRegenerate = async () => {
    if (onRegenerate && data as PitchFormData) {
      try {
        await onRegenerate(data as PitchFormData, suggestions);
        setHasGeneratedPitch(true);
      } catch (error) {
        console.error('Error regenerating pitch:', error);
        toast({
          title: "Error",
          description: "Failed to regenerate pitch. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSendSuggestions = async () => {
    if (onRegenerate && suggestions.trim() && data as PitchFormData) {
      try {
        await onRegenerate(data as PitchFormData, suggestions);
        setSuggestions("");
      } catch (error) {
        console.error('Error sending suggestions:', error);
        toast({
          title: "Error",
          description: "Failed to send suggestions. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return {
    suggestions,
    setSuggestions,
    hasGeneratedPitch,
    setHasGeneratedPitch,
    formatPitchText,
    handleCopy,
    handleExport,
    handleRegenerate,
    handleSendSuggestions,
  };
}