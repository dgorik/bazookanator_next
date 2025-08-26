// import { superbase } from "../../../../config/clients/superbase"
// import { buildSQLPrompt } from "@/lib/openai/promptBuilder";
// import { generateSQL } from "@/lib/openai/generateSQL";
// import { type NextRequest, NextResponse } from "next/server"
// import { generateSummary } from "@/lib/openai/generateSummary";

// export async function POST(request: NextRequest){
//     try{
//         const body = await request.json()
//         const {userQuestion} = body
//         const prompt = buildSQLPrompt(userQuestion);     
//         const sql = await generateSQL(prompt);
//         console.log(sql)
//         const { data, error } = await superbase.rpc("run_dynamic_sql", { sql_text: sql })
//         console.log(data)
//         const summary = await generateSummary(data)
//         if (error) {
//       console.error("Supabase error:", error)
//       return NextResponse.json({ success: false, message: error.message }, { status: 400 })
//     }

//     console.log("Query Result:", summary)

//     return NextResponse.json({ success: true, summary })
//     }

//     catch (error) {
//     console.error("Fethcing Error:", error)
//     return NextResponse.json({ success: false, message: "Data you requested doesn't exist" }, { status: 500 })
//   }
// }
