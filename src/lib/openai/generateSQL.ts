import { salesSchema } from "../schema/sales";

export function buildSQLPrompt(userQuestion: string) {
  return `
You are a helpful assistant that converts natural language into SQL.

${salesSchema}

Convert this user question into a valid PostgreSQL SELECT query:
"${userQuestion}"

Only output SQL. Do not include any explanation.
`;
}
