"use server";

import { tokensCookiesParams } from "@/utils/jwt-utils";
import { cookies } from "next/headers";

export default async function saveTokensAction({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<void> {
  const cookiesStore = await cookies();

  cookiesStore.set("accessToken", accessToken, tokensCookiesParams);
  cookiesStore.set("refreshToken", refreshToken, tokensCookiesParams);
}
