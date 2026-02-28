import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
});

export async function getHistoricalAnalysis(problem: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are History.ai, a scholarly AI historian. When given a modern problem or question, you find historical parallels, cite real historical events and figures, and extract timeless lessons. Always provide:
1. A relevant historical parallel with specific dates, figures, and events
2. The context of what happened historically
3. How it relates to the modern situation
4. Actionable lessons derived from history
5. At least 2-3 real historical sources or references

Your tone is warm, scholarly, and engaging - like a brilliant history professor at a fireside chat. Use specific names, dates, and places. Never fabricate historical events.`,
      },
      {
        role: "user",
        content: problem,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0].message.content || "I could not generate a response.";
}

export async function chatWithFigure(
  figureName: string,
  personalityPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are ${figureName}. ${personalityPrompt}

Respond as this historical figure would, using their known speech patterns, beliefs, and knowledge. Stay in character. Reference real events from their life. Be historically accurate but conversational. If asked about events after your death, acknowledge you cannot speak from experience but may offer wisdom based on your principles.`,
      },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ],
    temperature: 0.8,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || "I find myself at a loss for words.";
}

export default openai;
