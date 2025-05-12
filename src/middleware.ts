import { MiddlewareConfig, NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicRoutes = [
  { path: "/login", method: "redirect" },
  { path: "/register", method: "redirect" },
];
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const publicRoute = publicRoutes.find((route) => route.path === pathname);

  const accessToken = req.cookies.get("access_token");

  if (!authToken && !publicRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, req.url)
    );
  }

  if (!accessToken) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, req.url)
    );
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
