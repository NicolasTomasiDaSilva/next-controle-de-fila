import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(request: Request) {
  const body = await request.json();
  const refreshToken = body.refreshToken;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token ausente" },
      { status: 401 }
    );
  }

  // Solicita novos tokens à API externa
  const apiRes = await fetch(
    "http://localhost:5135/api/autenticacao/refresh-token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );
  const data = await apiRes.json();

  if (!data.accessToken) {
    // Refresh falhou (login expirado)
    return NextResponse.json({ error: "Falha no refresh" }, { status: 401 });
  }

  // Define novos cookies HTTP-only
  const response = NextResponse.json({
    accessToken: data.accessToken,
  });
  response.cookies.set(
    "accessToken",
    data.accessToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  response.cookies.set(
    "refreshToken",
    data.refreshToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  console.log("deu certo");
  return response;
}
