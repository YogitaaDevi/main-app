import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Allow public access to /dashboard only
  if (pathname === "/dashboard") {
    return NextResponse.next();
  }

  // Protect /blog and /blog/[slug] routes
  if (pathname.startsWith("/blog")) {
    console.log(`Middleware: Checking protection for ${pathname}. AuthToken present: ${!!authToken}`);
    if (!authToken) {
      console.log("Middleware: No auth token, redirecting to home with login modal");
      // Redirect to home page with #login hash to open modal
      const homeUrl = new URL("/", request.url);
      homeUrl.hash = "login";
      homeUrl.searchParams.set("redirect_to", pathname);
      console.log("Middleware: Redirecting to:", homeUrl.toString());
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/blog/:path*"],
};
