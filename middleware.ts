import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals and static assets
  if (pathname.includes("/_next/") || pathname.includes("/favicon.ico")) {
    return NextResponse.next();
  }

  // Allow public access to /dashboard and /blog (listing page)
  if (pathname === "/dashboard" || pathname === "/blog" || pathname === "/blog/") {
    return NextResponse.next();
  }

  // Protect /blog/[slug] routes
  // This regex matches /blog/ followed by anything
  if (pathname.startsWith("/blog/")) {
    console.log(`Middleware: Checking protection for ${pathname}. AuthToken present: ${!!authToken}`);
    if (!authToken) {
      console.log("Middleware: No auth token, redirecting to login");
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect_to", pathname);
      console.log("Middleware: Redirecting to login URL:", loginUrl.toString());
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/blog/:path*"],
};
