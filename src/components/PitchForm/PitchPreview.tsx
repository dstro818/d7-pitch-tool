import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Music, Copy, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
  onRegenerate?: () => void;
}

export function PitchPreview({ data, onRegenerate }: PitchPreviewProps) {
  const { toast } = useToast();

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
    
    // Genre Section
    if (data.genres && data.genres.length > 0) {
      parts.push(`[${data.genres.join(', ')}]`);
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
    
    return parts.join(' ');
  };

  const pitchText = formatPitchText();
  const characterCount = pitchText.length;
  const isOverLimit = characterCount > 500;
  const showPreview = characterCount > 0;

  const handleCopy = async () => {
    if (isOverLimit) {
      toast({
        title: "Error",
        description: "Pitch exceeds 500 characters. Please shorten it before copying.",
        variant: "destructive",
      });
      return;
    }

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
    if (isOverLimit) {
      toast({
        title: "Error",
        description: "Pitch exceeds 500 characters. Please shorten it before exporting.",
        variant: "destructive",
      });
      return;
    }

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

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
      toast({
        title: "Regenerating",
        description: "Generating new pitch suggestions...",
      });
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
        <div className="text-muted-foreground">
          {showPreview ? (
            <>
              {pitchText}
              {characterCount > 0 && (
                <div className={`text-xs mt-2 ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {characterCount}/500 characters
                </div>
              )}
            </>
          ) : (
            <span className="text-muted-foreground/50 italic">
              Start typing to see your pitch preview...
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-2"
          disabled={isOverLimit || !showPreview}
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
          disabled={isOverLimit || !showPreview}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardFooter>
    </Card>
  );
}