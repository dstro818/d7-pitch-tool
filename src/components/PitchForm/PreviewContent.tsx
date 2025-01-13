import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviewContentProps {
  data: Partial<PitchFormData>;
  isGenerating: boolean;
  formatPitchText: () => string;
}

export function PreviewContent({ data, isGenerating, formatPitchText }: PreviewContentProps) {
  const pitchText = formatPitchText();
  const truncatedText = pitchText.slice(0, 500);
  const characterCount = pitchText.length;
  const isOverLimit = characterCount > 500;

  const showPreview = characterCount > 0;

  if (isGenerating) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="text-muted-foreground">
      {showPreview ? (
        <>
          {isOverLimit ? truncatedText : pitchText}
          <div className={`text-xs mt-2 ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
            {characterCount}/500 characters {isOverLimit && '(truncated)'}
          </div>
        </>
      ) : (
        <span className="text-muted-foreground/50 italic">
          Start typing to see your pitch preview...
        </span>
      )}
    </div>
  );
}