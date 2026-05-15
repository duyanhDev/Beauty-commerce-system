import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  // ← thêm header disable bfcache
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");

  if (!token) return response;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin" && pathname.startsWith("/quan-tri-vien")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (error) {
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
