import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import axios from "axios";
import { axiosInstance } from "@/api/api";
import { authTokensSchema } from "@/models/auth-tokens";

export async function POST(request: Request) {
  const body = await request.json();
  const refreshToken = body.refreshToken;

  const api = await axiosInstance(true);
  const apiRes = await api.post(
    `/autenticacao/refresh-token`,
    {
      refreshToken,
    },
    {
      validateStatus: () => true,
    }
  );

  if (apiRes.status != 200) {
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  }

  const resultado = authTokensSchema.safeParse(apiRes.data);
  if (!resultado.success) {
    throw new Error("Dados inválidos");
  }

  const response = NextResponse.json({
    accessToken: resultado.data.accessToken,
  });

  response.cookies.set(
    "accessToken",
    resultado.data.accessToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  response.cookies.set(
    "refreshToken",
    resultado.data.refreshToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  return response;
}
