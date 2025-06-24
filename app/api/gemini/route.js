import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not configured");
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const { code } = await req.json();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const aiResponse = await model.generateContent({
      prompt: `Please debug and refine this code:\n\n${code}`
    });
    const result = await aiResponse.response.text();
    return NextResponse.json({ result });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
