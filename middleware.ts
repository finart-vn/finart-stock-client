import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.href);

  // Get the token directly using next-auth/jwt
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Session token:", token ? "Found" : "Not found");

  const isAuthPage = request.nextUrl.pathname === "/login";
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/profile");

  // If on login page and already authenticated, redirect to dashboard
  if (isAuthPage && token) {
    console.log("Authenticated user on login page - redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If accessing protected route without authentication, redirect to login
  if (isProtectedRoute && !token) {
    console.log(
      "Unauthenticated user on protected route - redirecting to login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*", "/profile/:path*"],
};
