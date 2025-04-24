import { NextRequest, NextResponse } from "next/server";

import { ArgumentException, HeaderException, HTTP_CODES, SqlException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get("DbRef-Id");
    if (!id)
      throw new HeaderException("Reference-Project-Id");

    if (Number.isNaN(id))
      throw new ArgumentException("Id is NaN.");

    const db = await InitDB();
    const response = await db.pv.GetProjectFromId(parseInt(id));
    return NextResponse.json(response);
  }
  catch (e) {
    // If mandatory headers are missing or data is ill-formatted.
    if (e instanceof HeaderException || e instanceof ArgumentException)
      return HTTP_CODES.bad_request(e.message);

    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    return HTTP_CODES.internal_server_error();
  }

  // const id = request.headers.get("DbRef-Id");
  // if (!id)
  //   return HTTP_CODES.bad_request("DbRef-Id");

  // try {
  //   const obj = await DB.pv.GetProjectFromId(parseInt(id));
  //   return NextResponse.json(obj, {
  //     status: 200
  //   });
  // } catch (error) {
  //   console.error(error);

  //   if ((error as Error).message == SQL_ERRORS.result_empty)
  //     return HTTP_CODES.not_found("DbRef-Id");
  //   return HTTP_CODES.bad_gateway();
  // }
}