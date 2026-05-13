// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
// proxy.ts — đơn giản, chỉ bảo vệ route
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) return NextResponse.next();

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Chỉ bảo vệ route — không redirect tự động
    if (payload.role !== "admin" && pathname.startsWith("/quan-tri-vien")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
