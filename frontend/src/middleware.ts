import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * NOTE: The backend API lives on a different domain (test21.fireai.agency).
 * Cookies set by the backend are scoped to that domain and are NOT visible
 * to Next.js middleware running on localhost:3000 / the frontend origin.
 *
 * Therefore cookie-based session checks in middleware are impossible with
 * this architecture. Dashboard protection is handled client-side by RoleGuard,
 * and login-page bounce is handled by the login/signup pages themselves.
 *
 * Keep this file so it can be re-enabled if the API is ever proxied through
 * Next.js (same origin) or a session cookie is set on the frontend domain.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
