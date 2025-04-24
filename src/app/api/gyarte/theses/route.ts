import { NextRequest, NextResponse } from "next/server";

import { HeaderException, HTTP_CODES, SqlException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(request: NextRequest) {
  try {
    const year = request.headers.get("Reference-Publication-Year");
    if (!year)
      throw new HeaderException("Reference-Publication-Year");

    const course = request.headers.get("Reference-Course");
    if (!course)
      throw new HeaderException("Reference-Course");

    const db = await InitDB();

    const response = await db.gy.GetThesesByYearAndCourse(parseInt(year), course);
    return NextResponse.json(response);
  }
  catch (e) {
    // If mandatory headers are missing.
    if (e instanceof HeaderException)
      return HTTP_CODES.bad_request(e.message);

    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    return HTTP_CODES.internal_server_error();
  }
}