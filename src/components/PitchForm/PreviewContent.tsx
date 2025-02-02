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
  const characterCount = isGenerating ? 0 : pitchText.length;

  const showPreview = characterCount > 0;

  if (isGenerating) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="text-xs mt-2 text-muted-foreground">
          Generating pitch...
        </div>
      </div>
    );
  }

  return (
    <div className="text-muted-foreground">
      {showPreview ? (
        <>
          {pitchText}
          <div className="text-xs mt-2 text-muted-foreground">
            {characterCount}/500 characters
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