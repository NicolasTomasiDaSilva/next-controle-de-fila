"use server";

import { cookies } from "next/headers";

export default async function getTokensAction(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  const cookiesStore = await cookies();

  return {
    accessToken: cookiesStore.get("accessToken")?.value,
    refreshToken: cookiesStore.get("refreshToken")?.value,
  };
}
