import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Music, Quote } from "lucide-react";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
}

export function PitchPreview({ data }: PitchPreviewProps) {
  const formatPitchText = () => {
    const parts = [];
    
    // Add genres in brackets if they exist
    if (data.genres && data.genres.length > 0) {
      parts.push(`[${data.genres.join(', ')}]`);
    }
    
    // Add title and artists
    parts.push(data.title || "Untitled Track");
    if (data.artists) {
      parts.push(`ft. ${data.artists}`);
    }
    
    // Add theme after a period
    if (data.theme) {
      parts.push(data.theme);
    }
    
    return parts.join(' ');
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
          {formatPitchText()}
        </div>

        {data.lyrics && (
          <div className="flex items-start gap-2">
            <Quote className="h-4 w-4 mt-1 shrink-0" />
            <div className="text-muted-foreground italic">
              "{data.lyrics}"
            </div>
          </div>
        )}

        {(data.productionElements?.length > 0 || data.customProductionElements?.length > 0) && (
          <div className="flex flex-wrap gap-1">
            {[...(data.productionElements || []), ...(data.customProductionElements || [])].map((element) => (
              <Badge key={element} variant="secondary">
                {element}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}