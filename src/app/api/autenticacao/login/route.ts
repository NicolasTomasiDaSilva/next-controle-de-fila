import { axiosInstance } from "@/api/api";
import { authTokensSchema } from "@/models/auth-tokens";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const api = await axiosInstance(true);
  const response = await api.post(`/autenticacao/login`, body, {
    validateStatus: () => true,
  });

  if (response.status != 200) {
    return NextResponse.json(response.data, { status: response.status });
  }

  const resultado = authTokensSchema.safeParse(response.data);
  if (!resultado.success) {
    throw new Error("Dados inválidos");
  }
  const { accessToken, refreshToken } = resultado.data;

  const cookieStore = await cookies();
  cookieStore.set(
    "accessToken",
    accessToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  cookieStore.set(
    "refreshToken",
    refreshToken,
    tokensCookiesParams as Partial<ResponseCookie>
  );
  return NextResponse.json({});
}
