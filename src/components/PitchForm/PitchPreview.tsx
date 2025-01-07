import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Music, Users, FileText, Quote, User, ListMusic } from "lucide-react";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
}

export function PitchPreview({ data }: PitchPreviewProps) {
  const genresText = data.genres && data.genres.length > 0 
    ? `[${data.genres.join(', ')}]` 
    : '';

  return (
    <Card className="w-full glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          {data.title || "Untitled Track"}
          {data.artists && <span className="text-muted-foreground">ft. {data.artists}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.theme && (
          <div className="text-muted-foreground whitespace-pre-wrap">
            {genresText && <span className="font-medium">{genresText} </span>}
            {data.theme}
          </div>
        )}

        {data.lyrics && (
          <div className="flex items-start gap-2">
            <Quote className="h-4 w-4 mt-1 shrink-0" />
            <div className="text-muted-foreground whitespace-pre-wrap italic">
              "{data.lyrics}"
            </div>
          </div>
        )}

        {(data.productionElements?.length > 0 || data.customProductionElements?.length > 0) && (
          <div className="flex items-start gap-2">
            <Music className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="flex flex-wrap gap-1">
                {[...(data.productionElements || []), ...(data.customProductionElements || [])].map((element) => (
                  <Badge key={element} variant="secondary">
                    {element}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}