import React from "react";
import { PitchFormData } from "@/types/pitch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Music, Quote, Copy, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PitchPreviewProps {
  data: Partial<PitchFormData>;
}

export function PitchPreview({ data }: PitchPreviewProps) {
  const { toast } = useToast();

  const formatPitchText = () => {
    const parts = [];
    
    if (data.genres && data.genres.length > 0) {
      parts.push(`[${data.genres.join(', ')}]`);
    }
    
    parts.push(data.title || "Untitled Track");
    if (data.artists) {
      parts.push(`ft. ${data.artists}`);
    }
    
    if (data.theme) {
      parts.push(data.theme);
    }
    
    return parts.join(' ');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatPitchText());
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
    const element = document.createElement("a");
    const file = new Blob([formatPitchText()], {type: 'text/plain'});
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
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardFooter>
    </Card>
  );
}