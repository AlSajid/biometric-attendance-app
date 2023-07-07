import Hours from "@/db/models/hours";
import { getData } from "@/db/operations/getData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const updatedData = await request.json();
    const result = await Hours.updateOne(
        {},
        { ...updatedData },
        { upsert: true }
      );
      console.log(result);

      if(result.acknowledged === true && result.matchedCount === 1){
        return NextResponse.json("success")
      } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
}

export async function GET() {
  return await getData(Hours);
}

