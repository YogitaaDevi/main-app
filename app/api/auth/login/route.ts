import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get user info from request body (sent from client after Privy login)
    const body = await request.json();
    const { user } = body;

    const response = NextResponse.json({ success: true });
    
    // Set auth token cookie (httpOnly for security)
    response.cookies.set("auth_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Set a client-readable cookie for auth status (non-httpOnly)
    response.cookies.set("auth_status", "logged_in", {
      httpOnly: false, // Client can read this
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Store user info in separate cookie (if provided)
    if (user) {
      response.cookies.set("user_info", JSON.stringify({
        id: user.id,
        email: user.email?.address || null,
        wallet: user.wallet?.address || null,
        createdAt: user.createdAt,
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, error: "Failed to set cookies" }, { status: 500 });
  }
}
