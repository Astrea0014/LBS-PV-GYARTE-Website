import { NextResponse } from "next/server";

export const SQL_ERRORS = {
  not_connected: 'Cannot disconnect; not connected.',
  already_connected: 'Cannot connect; already connected.',
  result_empty: 'Failed to fetch data: result list is empty.',
  data_requester_not_exists: (type: string): string => `Data requester for type ${type} could not be found; no matching data requester registered.`,
  input_nan: 'Input is ill-formatted; value is NaN.'
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