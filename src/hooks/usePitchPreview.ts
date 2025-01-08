import { useState } from "react";
import { PitchFormData } from "@/types/pitch";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

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
    
    const text = parts.join('\n\n');
    return text;
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
    const doc = new jsPDF();
    const text = formatPitchText();
    const splitText = doc.splitTextToSize(text, 180);
    
    // Add title
    doc.setFontSize(20);
    doc.text("Pitch Document", 105, 20, { align: "center" });
    
    // Add content
    doc.setFontSize(12);
    doc.text(splitText, 15, 40);
    
    // Add footer with date
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 280);
    
    doc.save("pitch.pdf");
    
    toast({
      title: "Exported!",
      description: "Pitch exported as PDF",
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