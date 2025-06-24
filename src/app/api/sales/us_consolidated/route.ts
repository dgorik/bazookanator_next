import { superbase } from "@/lib/clients/superbase"
import { buildSQLPrompt } from "@/lib/openai/promptBuilder";
import { generateSQL } from "@/lib/openai/generateSQL";
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {userQuestion} = body
        const prompt = buildSQLPrompt(userQuestion);     
        const sql = await generateSQL(prompt);
        console.log(sql)
        const { data, error } = await superbase.rpc("run_dynamic_sql", { sql_text: sql })
        if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

    console.log("Query Result:", data[0].result)

    return NextResponse.json({ success: true, data })
    }

    catch (error) {
    console.error("Fethcing Error:", error)
    return NextResponse.json({ success: false, message: "Data you requested doesn't exist" }, { status: 500 })
  }
}
