import { NextRequest, NextResponse } from "next/server";
import { HTTP_CODES } from "@/app/lib/Errors";

export function POST(request: NextRequest) {
  return HTTP_CODES.not_implemented();
}