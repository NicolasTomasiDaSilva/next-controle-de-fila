"use server";

import { cookies } from "next/headers";

export default async function deleteTokensAction(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
