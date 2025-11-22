import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Delete auth token
  response.cookies.delete("auth_token");
  
  // Delete user info
  response.cookies.delete("user_info");
  
  return response;
}
