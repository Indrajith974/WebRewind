import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { date } = await req.json();
    
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();
    
    if (year < 1990 || year > currentYear) {
      return NextResponse.json({ error: `Date out of bounds (must be between 1990 and ${currentYear})` }, { status: 400 });
    }

    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const prompt = `You are a retro internet historian. The user was born on ${formattedDate}.
Write a nostalgic, deeply immersive "Notepad" document from the perspective of an internet user exactly on that date or week in ${year}.
Be historically accurate to that specific day and year. Do NOT mention anything that hasn't happened yet.
Keep it to roughly 3-4 short paragraphs.
Make it feel like a real person typing a casual log or diary entry on their old PC.

Include:
- What big news, internet events, or tech announcements just happened around this exact date.
- What websites or chat rooms people are hanging out in or excited about right now.
- Any viral memes, flash games, or internet culture spreading that month.

Format the response as plain text only. NO markdown styling, NO bold, NO asterisks. Just raw text with blank lines separating paragraphs like a real dusty Windows Notepad .txt file.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating history:", error);
    return NextResponse.json({ error: "Failed to generate history" }, { status: 500 });
  }
}
