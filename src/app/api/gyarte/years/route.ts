import { NextRequest, NextResponse } from "next/server";

import { HTTP_CODES, SqlException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(_: NextRequest) {
  try {
    const db = await InitDB();
    const response = await db.gy.GetPresentYears();
    return NextResponse.json(response);
  }
  catch (e) {
    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    return HTTP_CODES.internal_server_error();
  }
}