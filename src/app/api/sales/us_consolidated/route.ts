import { supabase } from "@/lib/clients/superbase"
import { buildSQLPrompt } from "@/lib/openai/promptBuilder";
import { generateSQL } from "@/lib/openai/generateSQL";
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {userQuestion} = body
        const prompt = buildSQLPrompt(userQuestion);      // step 3
        const sql = await generateSQL(prompt);
        console.log(sql)
    }

    catch (error) {
    console.error("Fethcing Error:", error)
    return NextResponse.json({ success: false, message: "Data you requested doesn't exist" }, { status: 500 })
  }
}
