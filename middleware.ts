import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting map (in-memory, consider Redis for production at scale)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 60 requests per minute per IP
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const now = Date.now();
    const clientRateLimit = rateLimit.get(ip);

    if (clientRateLimit) {
      if (now < clientRateLimit.resetTime) {
        if (clientRateLimit.count >= RATE_LIMIT_MAX) {
          return new NextResponse(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': String(Math.ceil((clientRateLimit.resetTime - now) / 1000)),
              },
            }
          );
        }
        clientRateLimit.count++;
      } else {
        // Reset window
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      // First request from this IP
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  }

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance
    const now = Date.now();
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};

