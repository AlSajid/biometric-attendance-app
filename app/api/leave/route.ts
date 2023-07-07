import { NextResponse } from "next/server";
import getLeaves from "./getLeaves";
import Leave from "@/db/models/leave";

export async function GET () {
    return NextResponse.json(getLeaves(Leave))
}

export async function POST () {

}