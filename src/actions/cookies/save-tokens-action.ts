"use server";

import { AuthTokens } from "@/models/auth-tokens";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { cookies } from "next/headers";

export default async function saveTokensAction({
  accessToken,
  refreshToken,
}: AuthTokens): Promise<void> {
  const cookiesStore = await cookies();

  cookiesStore.set("accessToken", accessToken, tokensCookiesParams);
  cookiesStore.set("refreshToken", refreshToken, tokensCookiesParams);
}
