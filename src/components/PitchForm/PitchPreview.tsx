import React, { useState } from "react";
import { PitchFormData } from "@/types/pitch";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PitchSuggestions } from "./PitchSuggestions";
import { PitchActions } from "./PitchActions";
import { Skeleton } from "@/components/ui/skeleton";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
  onRegenerate?: (suggestions?: string) => void;
}

export function PitchPreview({ data, onRegenerate }: PitchPreviewProps) {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedPitch, setHasGeneratedPitch] = useState(false);

  const formatPitchText = () => {
    const parts = [];
    
    // Title and Artists Section
    if (data.title) {
      if (data.artists) {
        parts.push(`${data.title} - ${data.artists}`);
      } else {
        parts.push(data.title);
      }
    }
    
    // Genre Section - without brackets
    if (data.genres && data.genres.length > 0) {
      parts.push(data.genres.join(', '));
    }
    
    // Main Description
    if (data.theme) {
      parts.push(data.theme);
    }
    
    // Production Elements
    if (data.production_elements?.length > 0 || data.custom_production_elements?.length > 0) {
      const elements = [...(data.production_elements || []), ...(data.custom_production_elements || [])];
      if (elements.length > 0) {
        parts.push(`Featuring ${elements.join(', ')}.`);
      }
    }
    
    // Notable Lyrics
    if (data.lyrics) {
      parts.push(`Notable lyrics: "${data.lyrics}"`);
    }
    
    // Artist Background
    if (data.artist_background) {
      parts.push(data.artist_background);
    }
    
    const text = parts.join(' ');
    return text.slice(0, 500); // Enforce 500 character limit
  };

  const pitchText = formatPitchText();
  const characterCount = pitchText.length;
  const isOverLimit = characterCount > 500;
  const showPreview = characterCount > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pitchText);
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
    const file = new Blob([pitchText], {type: 'text/plain'});
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
    if (onRegenerate) {
      setIsGenerating(true);
      try {
        await onRegenerate(suggestions);
        setHasGeneratedPitch(true);
      } catch (error) {
        console.error('Error regenerating pitch:', error);
        toast({
          title: "Error",
          description: "Failed to regenerate pitch. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleSendSuggestions = async () => {
    if (onRegenerate && suggestions.trim()) {
      setIsGenerating(true);
      try {
        await onRegenerate(suggestions);
        setSuggestions(""); // Clear suggestions after sending
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <Card className="w-full glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Pitch Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="text-muted-foreground">
            {showPreview ? (
              <>
                {pitchText}
                <div className={`text-xs mt-2 ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {characterCount}/500 characters
                </div>
              </>
            ) : (
              <span className="text-muted-foreground/50 italic">
                Start typing to see your pitch preview...
              </span>
            )}
          </div>
        )}
        {showPreview && hasGeneratedPitch && !isGenerating && (
          <PitchSuggestions
            value={suggestions}
            onChange={setSuggestions}
            onSend={handleSendSuggestions}
            isGenerating={isGenerating}
          />
        )}
      </CardContent>
      <CardFooter>
        <PitchActions
          onRegenerate={handleRegenerate}
          onCopy={handleCopy}
          onExport={handleExport}
          isGenerating={isGenerating}
          showPreview={showPreview}
        />
      </CardFooter>
    </Card>
  );
}
