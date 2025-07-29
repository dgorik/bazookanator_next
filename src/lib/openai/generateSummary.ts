import { openai_client } from "../../../utils/openai/openai";


export async function generateSummary(sqlResult: object) {
    const prompt = ` You are a financial data analyst. Please summarize the following SQL result in clear, natural language tailored for the finance department - ${sqlResult}`
    const response = await openai_client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return response.output_text;
}

//add a users prompt in here