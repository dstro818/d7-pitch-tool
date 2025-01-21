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
    const { title, artists, genres, theme, production_elements, custom_production_elements, lyrics, artist_background, target_playlist, suggestions } = await req.json();

    const formattedTitle = `"${title}" by ${artists}`;
    
    let prompt = `Generate a compelling music pitch between 490-500 characters using this information:
    Title: ${formattedTitle}
    Genres: ${genres?.join(', ')}
    Theme: ${theme || ''}
    Production Elements: ${[...(production_elements || []), ...(custom_production_elements || [])].join(', ')}
    Lyrics: ${lyrics || ''}
    Artist Background: ${artist_background || ''}
    Target Playlist: ${target_playlist || ''}
    ${suggestions ? `Additional suggestions: ${suggestions}` : ''}

    Critical Requirements:
    1. The pitch must be between 490-500 characters
    2. Must end with a complete, impactful sentence
    3. Include the most compelling aspects of the song and artist
    4. Format as a single flowing paragraph
    5. End with a strong conclusion about playlist fit or impact
    6. Never end with ellipsis or mid-sentence

    Example of a good pitch (500 characters):
    "Summer Nights" by The Dreamers blends Electronic and Pop into an enchanting summer anthem. With pulsing synths and dynamic percussion, this track captures the essence of warm evenings and endless possibilities. The chorus "Under starlit skies" resonates with dreamy vocals and atmospheric production. Drawing from their coastal roots, The Dreamers infuse authentic beach vibes into every note. This energetic yet laid-back track is perfect for Summer Hits playlists.`;

    console.log('Sending request to OpenAI with prompt:', prompt);

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
            content: 'You are a music industry expert that creates compelling and concise song pitches. Generate pitches between 490-500 characters that end with complete, impactful sentences.'
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
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const suggestion = data.choices[0].message.content.trim();

    // Verify character count and sentence completion
    if (suggestion.length < 490 || suggestion.length > 500 || suggestion.endsWith('...')) {
      console.error('Generated pitch does not meet requirements:', {
        length: suggestion.length,
        endsWithEllipsis: suggestion.endsWith('...'),
        pitch: suggestion
      });
    }

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