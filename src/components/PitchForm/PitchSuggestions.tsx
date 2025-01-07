import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface PitchSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isGenerating: boolean;
}

export function PitchSuggestions({ value, onChange, onSend, isGenerating }: PitchSuggestionsProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">
        Provide Changes, Updates or Feedback for our AI Agent
      </label>
      <div className="flex gap-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add any specific suggestions for the AI to consider when generating the pitch..."
          className="min-h-[100px]"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={onSend}
          disabled={!value.trim() || isGenerating}
          className="self-start"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}