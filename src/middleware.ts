import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const absoluteUrl = req.nextUrl.origin;

  //   if (req.nextUrl.pathname === "/login") {
  //     if (token) {
  //       return NextResponse.redirect(`${absoluteUrl}/`);
  //     }
  //     return NextResponse.next();
  //   }

  //   if (!token) {
  //     return NextResponse.redirect(`${absoluteUrl}/login`);
  //   }

  //   return NextResponse.next();
  // }
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(`${absoluteUrl}/painel-de-controle`);
  }
}
export const config = {
  matcher: ["/login", "/painel-de-controle", "/"],
};
