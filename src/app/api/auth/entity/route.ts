import { NextRequest, NextResponse } from "next/server";

import { AccessException, AuthException, ContentException, HTTP_CODES, ResultException, SqlException } from "@/app/lib/Errors";
import { GetTokenFromRequestCookie } from "@/app/lib/RoutingHelpers";

import { GetEntityACL } from "@/app/lib/authentication/AccessControl";
import { AuthenticatedUser, RegisterEntityActionArgs, UpdateEntityActionArgs } from "@/app/lib/authentication/AuthenticatedUser";

export async function POST(request: NextRequest) {
  // Register entity.

  try {
    // 1. Authenticate

    const token = await GetTokenFromRequestCookie(request);
    const acl = await GetEntityACL(token.entity_id);

    const user = new AuthenticatedUser(token, acl);

    // 2. Validate body

    const body = await request.json();

    if (!("username" in body))
      throw new SyntaxError("Required field 'username' is missing from body.");
    if (!("access" in body))
      throw new SyntaxError("Required field 'access' is missing from body.");

    // 3. Register entity.

    const response = await user.RegisterEntity(body as RegisterEntityActionArgs);
    return NextResponse.json(response, { status: 201 });
  }
  catch (e) {
    // If the token is missing, expired or invalid.
    if (e instanceof AuthException)
      return HTTP_CODES.unauthorized(e.message);

    // If the JSON-body is invalid or has an invalid structure.
    if (e instanceof SyntaxError || e instanceof ContentException)
      return HTTP_CODES.bad_request(e.message);

    // If the entity holding the token does not have the access required to perform this action.
    if (e instanceof AccessException) {
      console.error(e.message);
      return HTTP_CODES.forbidden();
    }

    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    console.error(e);
    return HTTP_CODES.internal_server_error();
  }
}

export async function PATCH(request: NextRequest) {
  // Update password and access rights for entity.

  try {
    // 1. Authenticate

    const token = await GetTokenFromRequestCookie(request);
    const acl = await GetEntityACL(token.entity_id);

    const user = new AuthenticatedUser(token, acl);

    // 2. Validate body

    const body = await request.json();

    if (!("username" in body))
      throw new SyntaxError("Required field 'username' is missing from body.");
    if (!("modify" in body))
      throw new SyntaxError("Required field 'modify' is missing from body.");

    // 3. Update entity.

    const response = await user.UpdateEntity(body as UpdateEntityActionArgs);
    return NextResponse.json(response);
  }
  catch (e) {
    // If the token is missing, expired or invalid.
    if (e instanceof AuthException)
      return HTTP_CODES.unauthorized(e.message);

    // If the JSON-body is invalid or has an invalid structure.
    if (e instanceof SyntaxError || e instanceof ContentException)
      return HTTP_CODES.bad_request(e.message);

    // If the entity holding the token does not have the access required to perform this action.
    if (e instanceof AccessException) {
      console.error(e.message);
      return HTTP_CODES.forbidden();
    }

    // If the entity does not exist.
    if (e instanceof ResultException)
      return HTTP_CODES.not_found(e.message);

    // If the SQL-executes are throwing.
    if (e instanceof SqlException) {
      console.error(e.message);
      return HTTP_CODES.bad_gateway();
    }

    console.error(e);
    return HTTP_CODES.internal_server_error();
  }
}

export function GET(request: NextRequest) {
  // Get usernames of registered entities.
  // OR
  // Get username and access for single entity.

  try {
    
  }
  catch (e) {

  }
}