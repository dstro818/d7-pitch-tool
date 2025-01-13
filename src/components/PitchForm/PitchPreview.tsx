import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Music } from "lucide-react";
import { PreviewContent } from "./PreviewContent";
import { PreviewFooter } from "./PreviewFooter";
import { usePitchPreview } from "@/hooks/usePitchPreview";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
  onRegenerate?: (data: PitchFormData, suggestions?: string) => void;
  isGenerating?: boolean;
}

export function PitchPreview({ data, onRegenerate, isGenerating = false }: PitchPreviewProps) {
  const {
    suggestions,
    setSuggestions,
    hasGeneratedPitch,
    formatPitchText,
    handleCopy,
    handleExport,
    handleRegenerate,
    handleSendSuggestions,
  } = usePitchPreview(data, onRegenerate);

  // Show preview if we're generating or have generated content
  const showPreview = isGenerating || hasGeneratedPitch;
  
  if (!showPreview) {
    return null;
  }

  return (
    <Card className="w-full glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Pitch Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PreviewContent
          data={data}
          isGenerating={isGenerating}
          formatPitchText={formatPitchText}
        />
      </CardContent>
      <CardFooter>
        <PreviewFooter
          showPreview={formatPitchText().length > 0}
          hasGeneratedPitch={hasGeneratedPitch}
          isGenerating={isGenerating}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          onRegenerate={handleRegenerate}
          onCopy={handleCopy}
          onExport={handleExport}
          onSendSuggestions={handleSendSuggestions}
        />
      </CardFooter>
    </Card>
  );
}