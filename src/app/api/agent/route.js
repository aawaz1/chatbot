import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function POST(req) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "gemini-1.5-pro-latest", // Updated model name
      temperature: 0.7,
    });

    const response = await model.invoke(query);
    return NextResponse.json({ result: response.content });

  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json(
      { 
        error: 'Gemini API Error',
        details: error.message.includes('404') 
          ? 'Model not found - try "gemini-1.5-pro-latest"'
          : error.message,
        solution: 'Check your API key and model name'
      },
      { status: 500 }
    );
  }
}