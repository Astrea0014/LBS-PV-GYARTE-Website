import { NextRequest, NextResponse } from "next/server";

import { Token } from "@/app/lib/Types";
import { ARGUMENT_EXCEPTIONS, AuthException } from "@/app/lib/Errors";

import { ImportJWT, ExportJWT } from "@/app/lib/authentication/Authentication";

// Route API helpers

/**
 * Gets and imports the JSON-web-token used for authentication from an incoming request.
 * @param request The incoming request.
 * @returns The token obtained from the JWT.
 * @throws An {@linkcode AuthException} if the token does not exist, is expired or is invalid.
 */
export async function GetTokenFromRequestCookie(request: NextRequest): Promise<Token> {
  const jwt = request.cookies.get("Authentication-Token");

  if (!jwt)
    throw new AuthException("No token is specified.");

  return ImportJWT(jwt.value);
}

export async function SetTokenAsCookie(response: NextResponse, token: string) {
  response.cookies.set("Authentication-Token", token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: "/api",
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict"
  });
}

// Fetch API helpers

export async function ThrowOnBadResponse(response: Response) {
  if (!response.ok)
    throw new Error(`${response.statusText} (${response.status}): ${(await response.json()).error}`);
}

export function ThrowOnNaN(num: number) {
  if (Number.isNaN(num))
    throw ARGUMENT_EXCEPTIONS.input_nan;
}