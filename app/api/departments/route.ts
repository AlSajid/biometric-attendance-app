import connect from "@/db/connect";
import Department from "@/db/models/department";
import { getData } from "@/db/operations/getData";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
  const newDepartment = await request.json()
  const result = await Department.create(newDepartment);
  return NextResponse.json({ result});
}

export async function GET () {
  return getData(Department);
}