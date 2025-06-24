import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with your secret API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { code } = await req.json(); // Extract code from request body

    // Prompt to guide the AI
    const prompt = `
You're a senior JavaScript developer. A user pasted the following code and wants to know if there are any bugs and how to fix them. If there are no bugs, explain what the code does clearly.

Code:
${code}
`;

    // Make request to OpenAI Chat API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅ reliable, affordable, and accessible
      messages: [
        {
          role: "system",
          content:
            "You are a helpful and expert JavaScript debugging assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the response message
    const result = chatCompletion.choices[0].message.content;
    return NextResponse.json({ result }); // Send back to frontend
  } catch (err) {
    console.error("API Route Error:", err);

    return NextResponse.json(
      { error: err.message || "Failed to contact OpenAI or process request." },
      { status: 500 }
    );
  }
}
