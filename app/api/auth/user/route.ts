import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get("user_info");

    if (!userInfoCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userInfo = JSON.parse(userInfoCookie.value);
    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    console.error("Get user API error:", error);
    return NextResponse.json({ user: null, error: "Failed to get user info" }, { status: 500 });
  }
}
