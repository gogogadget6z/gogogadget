import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token");

    if (!token?.value) {
      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is logged in and tries to access login page, redirect to admin
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_token");

    if (token?.value) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
