"use server";

import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { cookies } from "next/headers";

export default async function saveTokensAction({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<void> {
  const cookiesStore = await cookies();

  cookiesStore.set("access-token", accessToken, tokensCookiesParams);
  cookiesStore.set("refresh-token", refreshToken, tokensCookiesParams);
}
