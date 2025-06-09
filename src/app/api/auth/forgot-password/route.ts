import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest){
    try{
        const body = await request.json()
        const {email} = body
        return NextResponse.json({
            success: true,
            message: email
        })

    }
    catch(error){
        return NextResponse.json({
            success: true,
            message: "oooopsi dooopsie"
        })
    }
}