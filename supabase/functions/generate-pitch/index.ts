import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Format the prompt to generate a structured pitch
    const formattedPrompt = `
      Create a concise music pitch (max 500 characters) following this structure:
      1. Start with the title and artists (if applicable)
      2. Describe the song's theme and emotional impact
      3. Mention notable production elements or musical style
      4. Include any relevant background or context
      5. End with why this track stands out

      Original input: ${prompt}
      
      Remember to keep the total response under 500 characters while maintaining engaging and informative content.
    `

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: formattedPrompt }],
      max_tokens: 200,
      temperature: 0.7,
    })

    const suggestion = completion.data.choices[0]?.message?.content || ''

    return new Response(
      JSON.stringify({ suggestion }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})