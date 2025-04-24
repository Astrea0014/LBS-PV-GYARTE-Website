import { NextResponse } from "next/server";

export class AccessException extends Error {
  public required_access_id: string;

  public constructor(access_id: string) {
    super("Access control list does not contain the required access to execute this action.");
    this.required_access_id = access_id;
  }
}

export class ArgumentException extends Error {
  public constructor(message: string) {
    super(message);
  }
}

/**
 * Represents exceptions related to the token-based authentication-system.
 */
export class AuthException extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export class ContentException extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export class HeaderException extends Error {
  public constructor(message: string) {
    super(`Request is missing header '${message}'`);
  }
}

export class ResultException extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export class SqlException extends Error {
  public constructor(message: string) {
    super(message);
  }
};

export const ARGUMENT_EXCEPTIONS = {
  input_nan: new ArgumentException("Input is ill-formatted; value is NaN.")
};

export const RESULT_EXCEPTIONS = {
  result_empty: new ResultException("Result list is empty.")
};

export const SQL_EXCEPTIONS = {
  not_connected: new SqlException("Cannot disconnect; not connected."),
  already_connected: new SqlException("Cannot connect; already connected."),
  data_requester_not_exists: (type: string): SqlException => new SqlException(`Data requester for type ${type} could not be found; no matching data requester registered.`)
};

export const HTTP_CODES = {
  bad_request: (error: string) => NextResponse.json({
    "error": `Bad Request - Request is ill-formatted; ${error}`
  }, { status: 400 }),
  unauthorized: (error: string) => NextResponse.json({
    "error": `Unauthenticated; ${error}`
  }, { status: 401 }),
  forbidden: () => NextResponse.json({
    "error": `Forbidden; you do not have the authorization needed to perform this action.`
  }, { status: 403 }),
  not_found: (error: string) => NextResponse.json({
    "error": `Not Found; ${error}`
  }, { status: 404 }),
  internal_server_error: () => NextResponse.json({
    "error": "Internal Server Error; contact a system administrator if the issue persists."
  }, { status: 500 }),
  not_implemented: () => NextResponse.json({
    "error": "Not Implemented; A method for this route is declared but not yet defined."
  }, { status: 501 }),
  bad_gateway: () => NextResponse.json({
    "error": "An error in the SQL-database has occurred. Contact the server administrator for more information."
  }, { status: 502 })
};