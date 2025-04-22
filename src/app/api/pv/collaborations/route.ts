import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/instrumentation";
import { HTTP_CODES } from "@/app/lib/Errors";

export async function GET(request: NextRequest) {
  const year = request.headers.get("DbRef-Year");
  if (!year)
    return HTTP_CODES.bad_request("DbRef-Year");

  try {
    const obj = await DB.pv.GetCollaborationsFromYear(parseInt(year));
    return NextResponse.json(obj, {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return HTTP_CODES.bad_gateway();
  }
}