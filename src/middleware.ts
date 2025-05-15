import { NextURL } from "next/dist/server/web/next-url";
import { MiddlewareConfig, NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
] as const;
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  // Simulate setting a cookie for demonstration purposes
  req.cookies.set("access_token", "1234567890");
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  const accessToken = req.cookies.get("access_token");

  if (!accessToken && !publicRoute) {
    const redirectUrl: NextURL = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    accessToken &&
    publicRoute &&
    publicRoute?.whenAuthenticated === "redirect"
  ) {
    const redirectUrl: NextURL = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
