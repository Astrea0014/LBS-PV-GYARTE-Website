import { NextRequest, NextResponse } from "next/server";

import { HTTP_CODES, SqlException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(_: NextRequest) {
  try {
    const db = await InitDB();
    const response = db.pv.GetPresentYears();
    return NextResponse.json(db);
  } catch (e) {
    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    return HTTP_CODES.internal_server_error();
  }
}