import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const openAIOrgId = Deno.env.get('OPENAI_ORG_ID');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, artists, genres, theme, lyrics, production_elements, custom_production_elements, artist_background } = await req.json();
    console.log('Generating pitch with data:', { title, artists, genres, theme, production_elements });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'OpenAI-Organization': openAIOrgId || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a music industry expert creating compelling song pitches. Create a concise pitch (max 500 characters) that follows this structure:
            1. Start with "Title - Artists"
            2. Include genres without brackets, separated by commas if multiple
            3. Describe the theme and emotional impact
            4. Mention production elements if provided
            5. Include notable lyrics if provided
            6. Add relevant artist background if space permits
            
            Keep the response engaging and under 500 characters. Do not use brackets or special formatting.`
          },
          {
            role: 'user',
            content: `Generate a pitch for:
            Title: ${title}
            Artists: ${artists}
            Genres: ${genres.join(', ')}
            Theme: ${theme || 'Not provided'}
            Production Elements: ${[...production_elements, ...custom_production_elements].join(', ')}
            Lyrics: ${lyrics || 'Not provided'}
            Artist Background: ${artist_background || 'Not provided'}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const suggestion = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ suggestion }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error in generate-pitch function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});