import { supabase } from "@/lib/clients/superbase"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {promp} = body
        const prompt = buildSQLPrompt(userQuestion);      // step 3
const sql = await generateSQL(prompt);
        let { data, error } = await supabase
          .from('OP Database')
          .select('Measure')
        console.log(data)
        return NextResponse.json({
          success: true,
          message: "Registration successful. Please check your email to verify your account.",
        })
    }

    catch (error) {
    console.error("Fethcing Error:", error)
    return NextResponse.json({ success: false, message: "Data you requested doesn't exist" }, { status: 500 })
  }
}
