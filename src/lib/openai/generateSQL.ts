import { openai_client } from "@/src/lib/client/openai";
import { cleanedSQL } from "./data_clean/sqlUtils";

export async function generateSQL(prompt: string) {
  const response = await openai_client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return cleanedSQL(response.output_text);
}

