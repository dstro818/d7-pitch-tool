import OpenAI from 'openai';

export const getOpenAIClient = () => {
  const apiKey = localStorage.getItem('openai_api_key');
  if (!apiKey) {
    throw new Error('OpenAI API key not found');
  }
  return new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
};

export const generatePitchSuggestions = async (prompt: string) => {
  const openai = getOpenAIClient();
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a music industry expert helping to create compelling song pitches. Format your responses as JSON with fields: theme, genres (array), productionElements (array)."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error generating pitch suggestions:', error);
    throw error;
  }
};