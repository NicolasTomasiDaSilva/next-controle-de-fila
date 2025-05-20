import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const production = process.env.NEXT_PUBLIC_PRODUCTION?.toLowerCase() === "true";

export const tokensCookiesParams: Partial<ResponseCookie> = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60, //7 dias
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  sameSite: production ? "none" : undefined,
  secure: production,
};
