import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get('DbRef-Id');
    if (!id)
      throw 'id';

    return NextResponse.json(
      JSON.stringify(
        await __PvDb.GetCollaborationFromId(
          parseInt(id)
        )), {
          status: 200
        });
  } catch (error) {
    console.error(error);

    const is_header_error = error === 'id';

    return new NextResponse(
      is_header_error ? 'DbRef-Id is missing from request.' : 'BAD GATEWAY: DB failure', {
      status: is_header_error ? 400 : 502,
      headers: {
        'Error-Message': error as string
      }
    });
  }
}