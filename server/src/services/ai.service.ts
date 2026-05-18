import OpenAI from "openai";
import { env } from "../config/env";
import { ILead } from "../models/Lead.model";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || "missing-key",
});

export const generateEmailDraft = async (lead: ILead) => {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing. Please add it to your .env file.");
  }

  const prompt = `
You are an expert sales assistant. Draft a short, professional, and persuasive email to the following lead.
Do not include subject/body labels, just return a JSON object with "subject" and "body" keys.

Lead Name: ${lead.name}
Company Name: ${lead.companyName}
Company Description: ${lead.companyDescription}
Lead Source: ${lead.source}
Interest Level (1-10): ${lead.interestLevel}
Last Message: ${lead.lastMessage || "None"}

The email should:
1. Be personalized to their company and industry.
2. Acknowledge their specific interest level appropriately.
3. Be concise (max 3 paragraphs) and end with a clear, low-friction call to action (like a quick 10 min call).
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast and capable
    messages: [
      { role: "system", content: "You are a sales assistant that always replies in valid JSON format with exactly two keys: 'subject' and 'body'." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  const resultText = completion.choices[0].message.content;
  if (!resultText) throw new Error("Failed to generate email");

  return JSON.parse(resultText) as { subject: string; body: string };
};
