import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PitchSuggestions } from "./PitchSuggestions";
import { PitchActions } from "./PitchActions";

interface PreviewFooterProps {
  showPreview: boolean;
  hasGeneratedPitch: boolean;
  isGenerating: boolean;
  suggestions: string;
  setSuggestions: (value: string) => void;
  onRegenerate: () => void;
  onCopy: () => void;
  onExport: () => void;
  onSendSuggestions: () => void;
}

export function PreviewFooter({
  showPreview,
  hasGeneratedPitch,
  isGenerating,
  suggestions,
  setSuggestions,
  onRegenerate,
  onCopy,
  onExport,
  onSendSuggestions,
}: PreviewFooterProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <PitchActions
        onRegenerate={onRegenerate}
        onCopy={onCopy}
        onExport={onExport}
        isGenerating={isGenerating}
        showPreview={showPreview}
      />
      
      {showPreview && !isGenerating && (
        <Card className="w-full border-primary/20 bg-primary/5 shadow-lg">
          <CardContent className="pt-6">
            <PitchSuggestions
              value={suggestions}
              onChange={setSuggestions}
              onSend={onSendSuggestions}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}