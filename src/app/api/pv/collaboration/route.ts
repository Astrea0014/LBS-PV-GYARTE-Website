import { NextRequest, NextResponse } from "next/server";

import { HeaderException, ResultException, SqlException, HTTP_CODES, ArgumentException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get("Reference-Collaboration-Id");
    if (!id)
      throw new HeaderException("Reference-Collaboration-Id");

    if (Number.isNaN(id))
      throw new ArgumentException("Id is NaN.");

    const db = await InitDB();
    const response = await db.pv.GetCollaborationFromId(parseInt(id));
    return NextResponse.json(response);
  }
  catch (e) {
    // If mandatory headers are missing.
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