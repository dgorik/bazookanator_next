import { openai_client } from "@/lib/clients/openai";

export async function generateSQL(prompt: string) {
  const response = await openai_client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return response.output_text;
}

