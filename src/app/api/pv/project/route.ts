import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/instrumentation";
import { SQL_ERRORS, HTTP_CODES } from "@/app/lib/Errors";

export async function GET(request: NextRequest) {
  const id = request.headers.get("DbRef-Id");
  if (!id)
    return HTTP_CODES.bad_request("DbRef-Id");

  try {
    const obj = await DB.PVGetProjectFromId(parseInt(id));
    return NextResponse.json(obj, {
      status: 200
    });
  } catch (error) {
    console.error(error);

    if ((error as Error).message == SQL_ERRORS.result_empty)
      return HTTP_CODES.not_found("DbRef-Id");
    return HTTP_CODES.bad_gateway();
  }
}