import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const year = request.headers.get('DbRef-Year');
    if (!year)
      throw 'year';

    const course = request.headers.get('DbRef-Course');
    if (!course)
      throw 'course';

    return NextResponse.json(
      JSON.stringify(
        await __GyDb.GetThesesByYearAndCourse(
          parseInt(year),
          course
        )), {
          status: 200
        });
  } catch (error) {
    console.error(error);

    let message: string;
    let code: number;

    switch (error) {
      case 'year':
        message = 'DbRef-Year header is missing from request.';
        code = 400;
        break;
      case 'course':
        message = 'DbRef-Course header is missing from request.';
        code = 400;
        break;
      default:
        message = 'BAD GATEWAY: DB failure';
        code = 502;
        break;
    }

    return new NextResponse(
      message, {
      status: code,
      headers: {
        'Error-Message': error as string
      }
    });
  }
}