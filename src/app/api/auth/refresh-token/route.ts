import { NextResponse } from "next/server";
import axios from "axios";
import { authTokensSchema } from "@/models/auth-tokens";
import { parse, serialize } from "cookie";

export async function POST(request: Request) {
  try {
    // Pega os cookies do header da request
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const refreshTokenStored = cookies["refreshToken"];

    if (!refreshTokenStored) {
      return NextResponse.json(
        { message: "Refresh token missing" },
        { status: 401 }
      );
    }

    // Chama backend para renovar tokens
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/autenticacao/refresh-token`,
      { refreshToken: refreshTokenStored },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("RESPOSTA DA MINHA API");
    console.log(response);
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Refresh token invalid" },
        { status: 401 }
      );
    }

    const resultado = authTokensSchema.safeParse(response.data);
    if (!resultado.success) {
      throw new Error("Dados inválidos");
    }

    const { accessToken, refreshToken } = resultado.data;

    // Serializa cookies para enviar no header de resposta
    const serializedAccessToken = serialize("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    const serializedRefreshToken = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Retorna a resposta com os cookies no header 'Set-Cookie'
    return NextResponse.json(
      { message: "Tokens refreshed" },
      {
        status: 200,
        headers: {
          "Set-Cookie": serializedAccessToken + ", " + serializedRefreshToken,
        },
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
