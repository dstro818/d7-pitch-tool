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

    let prompt = `Generate a compelling music pitch EXACTLY 500 characters or less using this information:
    Title: ${title}
    Artists: ${artists}
    Genres: ${genres?.join(', ')}
    Theme: ${theme || ''}
    Production Elements: ${[...(production_elements || []), ...(custom_production_elements || [])].join(', ')}
    Lyrics: ${lyrics || ''}
    Artist Background: ${artist_background || ''}
    Target Playlist: ${target_playlist || ''}
    ${suggestions ? `Additional suggestions: ${suggestions}` : ''}

    Format the pitch like this example:
    "Song Title - Artist Name, Genre1, Genre2, Theme description. Featuring production element 1, production element 2. Notable lyrics: "example lyrics". Artist background details."

    Important rules:
    1. Response MUST be EXACTLY 500 characters or less
    2. Don't use brackets for genres
    3. Only include sections that have content
    4. Make it flow naturally like a paragraph`;

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
            content: 'You are a music industry expert that creates compelling and concise song pitches. Always ensure your response is exactly 500 characters or less.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const suggestion = data.choices[0].message.content;

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