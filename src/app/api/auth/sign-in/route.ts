import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  cookies().set("userId", userId);
  return NextResponse.redirect(new URL("/", request.url));
}
