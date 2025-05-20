"use server";

import { cookies } from "next/headers";

export default async function getTokensAction(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  const cookiesStore = await cookies();

  return {
    accessToken: cookiesStore.get("access-token")?.value,
    refreshToken: cookiesStore.get("refresh-token")?.value,
  };
}
