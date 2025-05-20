"use server";

import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteTokensAction(): Promise<void> {
  const cookiesStore = await cookies();

  cookiesStore.delete({
    name: "access-token",
    domain: tokensCookiesParams.domain,
  });
  cookiesStore.delete({
    name: "refresh-token",
    domain: tokensCookiesParams.domain,
  });

  redirect("/login");
}
