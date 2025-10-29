import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest } from 'next/server';

// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    const { text } = await generateText({
      model: openai('gpt-4o-mini'), // Using GPT-4o-mini as requested
      messages,
      temperature: 0.7, // Slightly higher for more creative responses about agriculture
      system: `You are an AI Agronomist. Provide helpful, accurate, and concise information about agriculture, farming techniques, crop management, soil health, pest control, weather impacts, and sustainable farming practices. Be professional but approachable in your responses.` 
    });

    return new Response(
      JSON.stringify({ content: text }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}