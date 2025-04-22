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
  bad_request: (header: string) => new NextResponse(null, {
    status: 400,
    headers: {
      "Error-Message": "Request is ill-formatted. Required header '" + header + "' was not specified in request."
    }
  }),
  not_found: (header: string) => new NextResponse(null, {
    status: 404,
    headers: {
      "Error-Message": "The resource could not be found. Header '" + header + "' passed a value that does not reference an existing object."
    }
  }),
  bad_gateway: () => new NextResponse(null, {
    status: 502,
    headers: {
      "Error-Message": "An error in the SQL-database has occurred. Contact the server administrator for more information."
    }
  })
};