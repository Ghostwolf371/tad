import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: Request): string {
  // Use x-forwarded-for for rate limiting, fallback to 'anonymous'
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5; // 5 requests per minute

  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // CSRF validation
    const cookieStore = await cookies();
    const csrfTokenCookie = cookieStore.get("csrf-token")?.value;
    const body = await request.json();
    const csrfTokenHeader = request.headers.get("x-csrf-token");

    if (!csrfTokenCookie || !csrfTokenHeader || csrfTokenCookie !== csrfTokenHeader) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
    }

    const { name, email, message, company } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Email validation
    if (!isValidEmail(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizedName = name.trim().replace(/[<>]/g, "");
    const sanitizedEmail = email.trim().replace(/[<>]/g, "");
    const sanitizedMessage = message.trim().replace(/[<>]/g, "");
    const sanitizedCompany = company?.trim().replace(/[<>]/g, "") || "";

    // TODO: Wire to Resend, SendGrid, or email service
    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.info("[contact]", {
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        message: sanitizedMessage,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
