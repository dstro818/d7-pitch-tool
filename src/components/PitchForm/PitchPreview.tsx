import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Music, Users, FileText, Quote, User, ListMusic } from "lucide-react";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
}

export function PitchPreview({ data }: PitchPreviewProps) {
  return (
    <Card className="w-full glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          {data.title || "Untitled Track"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.artists && (
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Featured Artists</div>
              <div className="text-muted-foreground">{data.artists}</div>
            </div>
          </div>
        )}

        {data.genres && data.genres.length > 0 && (
          <div className="flex items-start gap-2">
            <ListMusic className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Genres</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.theme && (
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Theme/Story</div>
              <div className="text-muted-foreground whitespace-pre-wrap">{data.theme}</div>
            </div>
          </div>
        )}

        {data.lyrics && (
          <div className="flex items-start gap-2">
            <Quote className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Notable Lyrics</div>
              <div className="text-muted-foreground whitespace-pre-wrap">{data.lyrics}</div>
            </div>
          </div>
        )}

        {(data.productionElements?.length > 0 || data.customProductionElements?.length > 0) && (
          <div className="flex items-start gap-2">
            <Music className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Production Elements</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {[...(data.productionElements || []), ...(data.customProductionElements || [])].map((element) => (
                  <Badge key={element} variant="secondary">
                    {element}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.artistBackground && (
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium">Artist Background</div>
              <div className="text-muted-foreground whitespace-pre-wrap">
                {data.artistBackground}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}