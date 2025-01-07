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
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Get user suggestions if provided
    const { suggestions, ...pitchData } = formData;
    
    // Ensure all fields have a value, use empty string if null/undefined
    const {
      title = '',
      artists = '',
      genres = [],
      theme = '',
      lyrics = '',
      production_elements = [],
      custom_production_elements = [],
      artist_background = '',
      target_playlist = ''
    } = pitchData;

    // Create a structured prompt for OpenAI
    let prompt = `Generate a compelling music pitch under 500 characters using this information:
    Title: ${title}
    Artists: ${artists}
    Genres: ${genres.join(', ')}
    Theme: ${theme}
    Production Elements: ${[...production_elements, ...custom_production_elements].join(', ')}
    Lyrics: ${lyrics}
    Artist Background: ${artist_background}
    Target Playlist: ${target_playlist}`;

    // Add user suggestions if provided
    if (suggestions) {
      prompt += `\n\nAdditional suggestions to consider:\n${suggestions}`;
    }

    prompt += `\n\nFormat the pitch like this example:
    "Song Title - Artist Name, Genre1, Genre2, Theme description. Featuring production element 1, production element 2. Notable lyrics: "example lyrics". Artist background details."

    Important rules:
    1. Keep it under 500 characters
    2. Don't use brackets for genres
    3. Only include sections that have content
    4. Make it flow naturally like a paragraph
    5. Keep the original information but make it more engaging`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'OpenAI-Organization': openAIOrgId || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No content received from OpenAI');
    }

    const suggestion = data.choices[0].message.content.slice(0, 500);
    console.log('Generated suggestion:', suggestion);

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