import { NextRequest, NextResponse } from "next/server";

import { AuthException, ContentException, HTTP_CODES } from "@/app/lib/Errors";
import { SetTokenAsCookie } from "@/app/lib/RoutingHelpers";

import { AuthenticateEntity, AuthenticateMaster } from "@/app/lib/authentication/Authentication";

export async function POST(request: NextRequest) {
  try {
    // 1. Check if body format is valid.
    // 2. Validate information contained in body.
    // 3. Respond with cookie.

    const body = await request.json();
    let token: string;

    if (body.master)
      token = await AuthenticateMaster(body.master);
    else if (body.username && body.password)
      token = await AuthenticateEntity(body.username, body.password);
    else
      throw new SyntaxError("Missing field 'master' or fields 'username' and 'password' from body.");

    const response = new NextResponse(null, { status: 201 });
    await SetTokenAsCookie(response, token);
    return response;
  }
  catch (e: any) {
    // If the JSON-body is invalid or has an invalid structure.
    if (e instanceof SyntaxError)
      return HTTP_CODES.bad_request(e.message);

    if (e instanceof AuthException)
      return HTTP_CODES.unauthorized(e.message);

    return HTTP_CODES.internal_server_error();
  }
}