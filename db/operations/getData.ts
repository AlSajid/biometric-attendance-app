import connect from "@/db/connect";
import { NextResponse } from "next/server";

export async function getData(model:any) {
    await connect();
    const data = await model.find({});
    return NextResponse.json(data);
}