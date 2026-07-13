import { NextRequest, NextResponse } from "next/server";

const BACKEND_API = process.env.NEXT_PUBLIC_API_BACKEND_URL!;

type Context = { params: { path: string[] } | Promise<{ path: string[] }> };

async function proxy(request: NextRequest, context: Context): Promise<NextResponse> {
  const { path } = await context.params;
  const pathname = path.join("/");
  const search = request.nextUrl.search;

  const targetUrl = `${BACKEND_API}/${pathname}/${search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const cookie = request.headers.get("cookie");
  if (cookie) headers["Cookie"] = cookie;

  // Also forward Authorization header if present (Bearer token fallback)
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.text();
  }

  const backendRes = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseBody = await backendRes.text();

  const res = new NextResponse(responseBody, {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });

  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      const sanitised = value
        .replace(/;\s*domain=[^;]*/gi, "")
        .replace(/;\s*samesite=none/gi, "; SameSite=Lax");
      res.headers.append("Set-Cookie", sanitised);
    }
  });

  return res;
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
