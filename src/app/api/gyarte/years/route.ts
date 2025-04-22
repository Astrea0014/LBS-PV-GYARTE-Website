import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/instrumentation";
import { HTTP_CODES } from "@/app/lib/Errors";

export async function GET(_: NextRequest) {
  try {
    const obj = await DB.gy.GetPresentYears();
    return NextResponse.json(obj, {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return HTTP_CODES.bad_gateway();
  }
}