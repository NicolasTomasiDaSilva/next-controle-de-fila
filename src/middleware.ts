import { NextURL } from "next/dist/server/web/next-url";
import { MiddlewareConfig, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtIsValid } from "./utils/jwt";
import { Api } from "./api/api";

import { tokensCookiesParams } from "./utils/tokens-cookies-params";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
] as const;
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/fila";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

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
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // if (accessToken && !jwtIsValid(accessToken)) {
  //   if (refreshToken && jwtIsValid(refreshToken)) {
  //     try {
  //       const newTokens = await Api.refreshToken(refreshToken);
  //       const response = NextResponse.next();
  //       response.cookies.set(
  //         "accessToken",
  //         newTokens.accessToken,
  //         tokensCookiesParams
  //       );
  //       response.cookies.set(
  //         "refreshToken",
  //         newTokens.refreshToken,
  //         tokensCookiesParams
  //       );
  //       return response;
  //     } catch (error) {
  //       const redirectUrl: NextURL = req.nextUrl.clone();
  //       redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
  //       const response = NextResponse.redirect(redirectUrl);
  //       response.cookies.delete("accessToken");
  //       response.cookies.delete("refreshToken");
  //       return response;
  //     }
  //   }
  //   const redirectUrl: NextURL = req.nextUrl.clone();
  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
  //   const response = NextResponse.redirect(redirectUrl);
  //   response.cookies.delete("accessToken");
  //   response.cookies.delete("refreshToken");
  //   return response;
  // }

  //--------------------------------------------------------------------
  // if (accessToken && !jwtIsValid(accessToken) && !publicRoute) {
  //   if (refreshToken && jwtIsValid(refreshToken)) {
  //     try {
  //       const newTokens = await Api.refreshToken(refreshToken);
  //       const response = NextResponse.next();
  //       response.cookies.set(
  //         "accessToken",
  //         newTokens.accessToken,
  //         tokensCookiesParams
  //       );
  //       response.cookies.set(
  //         "refreshToken",
  //         newTokens.refreshToken,
  //         tokensCookiesParams
  //       );
  //       return response;
  //     } catch (error) {
  //       const redirectUrl: NextURL = req.nextUrl.clone();
  //       redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
  //       const response = NextResponse.redirect(redirectUrl);
  //       response.cookies.delete("accessToken");
  //       response.cookies.delete("refreshToken");
  //       return response;
  //     }
  //   }
  //   const redirectUrl: NextURL = req.nextUrl.clone();
  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
  //   const response = NextResponse.redirect(redirectUrl);
  //   response.cookies.delete("accessToken");
  //   response.cookies.delete("refreshToken");
  //   return response;
  // }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
