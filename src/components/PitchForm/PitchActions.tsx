import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Download } from "lucide-react";

interface PitchActionsProps {
  onRegenerate: () => void;
  onCopy: () => void;
  onExport: () => void;
  isGenerating: boolean;
  showPreview: boolean;
}

export function PitchActions({ 
  onRegenerate, 
  onCopy, 
  onExport, 
  isGenerating,
  showPreview 
}: PitchActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onRegenerate}
        className="flex items-center gap-2"
        disabled={isGenerating}
      >
        <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
        {isGenerating ? 'Generating...' : 'Regenerate'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="flex items-center gap-2"
        disabled={!showPreview}
      >
        <Copy className="h-4 w-4" />
        Copy
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="flex items-center gap-2"
        disabled={!showPreview}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}