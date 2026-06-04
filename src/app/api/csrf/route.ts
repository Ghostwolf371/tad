import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Generate a random CSRF token
function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function GET() {
  const token = generateCSRFToken();

  // Set cookie with CSRF token (httpOnly for security)
  const cookieStore = await cookies();
  cookieStore.set("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600, // 1 hour
    path: "/",
  });

  return NextResponse.json({ token });
}
