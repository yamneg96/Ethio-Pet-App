import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const isProtected = pathname.startsWith("/buy-") || pathname.startsWith("/sell-") || pathname.startsWith("/admin");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const decoded: any = verifyToken(token);
    if (!decoded) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }

    // Role-based protection
    if (pathname.startsWith("/buy-") && decoded.role !== "buyer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/sell-") && decoded.role !== "seller") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/buy-:path*", "/sell-:path*", "/admin/:path*"],
};
