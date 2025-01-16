import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const year = request.headers.get('DbRef-Year');
    if (!year)
      throw 'year';

    return NextResponse.json(
      JSON.stringify(
        await __PvDb.GetCollaborationsFromYear(
          parseInt(year) 
        )), {
          status: 200
        });
  } catch (error) {
    const is_header_error = error === 'year';

    return new NextResponse(
      is_header_error ? 'DbRef-Year header is missing from request.' : 'BAD GATEWAY: DB failure', {
      status: is_header_error ? 400 : 502, // BAD REQUEST | BAD GATEWAY
      headers: {
        'Error-Message': error as string
      }
    });
  }
}