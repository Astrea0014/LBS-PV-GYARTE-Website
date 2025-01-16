import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  try {
    return NextResponse.json(JSON.stringify(await __PvDb.GetDbPresentYears()), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('502 - BAD GATEWAY: DB failure', {
      status: 502,
      headers: {
        'Error-Message': error as string
      }
    });
  }
}