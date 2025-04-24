import { NextRequest, NextResponse } from "next/server";

import { HeaderException, HTTP_CODES, ResultException, SqlException } from "@/app/lib/Errors";
import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get("Reference-Thesis-Id");
    if (!id)
      throw new HeaderException("Reference-Thesis-Id");

    const db = await InitDB();

    const response = await db.gy.GetThesisById(parseInt(id));
    return NextResponse.json(response);
  }
  catch (e) {
    // If mandatory headers are missing.
    if (e instanceof HeaderException)
      return HTTP_CODES.bad_request(e.message);

    if (e instanceof ResultException)
      return HTTP_CODES.not_found(e.message);

    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    return HTTP_CODES.internal_server_error();
  }
}