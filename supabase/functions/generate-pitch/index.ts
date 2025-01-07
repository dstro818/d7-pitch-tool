import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    
    // Create a structured prompt for OpenAI
    let prompt = `Generate a compelling music pitch under 500 characters using this information:
    Title: ${formData.title}
    Artists: ${formData.artists}
    Genres: ${formData.genres?.join(', ')}
    Theme: ${formData.theme || ''}
    Production Elements: ${[...(formData.production_elements || []), ...(formData.custom_production_elements || [])].join(', ')}
    Lyrics: ${formData.lyrics || ''}
    Artist Background: ${formData.artist_background || ''}
    Target Playlist: ${formData.target_playlist || ''}

    Format the pitch like this example:
    "Song Title - Artist Name, Genre1, Genre2, Theme description. Featuring production element 1, production element 2. Notable lyrics: "example lyrics". Artist background details."

    Important rules:
    1. Keep it under 500 characters
    2. Don't use brackets for genres
    3. Only include sections that have content
    4. Make it flow naturally like a paragraph
    5. Keep the original information but make it more engaging`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a music industry expert that creates compelling and concise song pitches.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const suggestion = data.choices[0].message.content.slice(0, 500);

    return new Response(
      JSON.stringify({ suggestion }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-pitch function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});