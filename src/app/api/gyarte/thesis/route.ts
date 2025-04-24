import { NextRequest, NextResponse } from "next/server";

import { ArgumentException, HeaderException, HTTP_CODES, ResultException, SqlException } from "@/app/lib/Errors";
import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get("Reference-Thesis-Id");
    if (!id)
      throw new HeaderException("Reference-Thesis-Id");

    if (Number.isNaN(id))
      throw new ArgumentException("Id is NaN.");

    const db = await InitDB();
    const response = await db.gy.GetThesisById(parseInt(id));
    return NextResponse.json(response);
  }
  catch (e) {
    // If mandatory headers are missing or data is ill-formatted.
    if (e instanceof HeaderException || e instanceof ArgumentException)
      return HTTP_CODES.bad_request(e.message);

    // If no result could be found.
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