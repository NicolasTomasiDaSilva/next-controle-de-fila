import deleteTokensAction from "@/actions/cookies/delete-tokens-action";
import getTokensAction from "@/actions/cookies/get-tokens-action";
import saveTokensAction from "@/actions/cookies/save-tokens-action";
import { UnauthenticatedError } from "@/errors/errors";
import { AuthTokens, authTokensSchema } from "@/models/auth-tokens";
import isServer from "@/utils/is-server";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import axiosRetry from "axios-retry";

const MAX_RETRIES: number = 3;

export async function axiosInstance({
  withoutRetry = false,
  headers = {},
}: {
  withoutRetry?: boolean;
  headers?: Record<string, string>;
}): Promise<AxiosInstance> {
  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    timeout: 5000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (withoutRetry) {
    return instance;
  }

  const { accessToken: accessTokenStored, refreshToken: refreshTokenStored } =
    await getTokens();

  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessTokenStored}`;

  axiosRetry(instance, {
    retries: MAX_RETRIES,
    retryCondition: (error: any) => {
      return error.response?.status === 401;
    },
    onRetry: onRetry,
  });

  async function onRetry(
    retryCount: number,
    error: AxiosError,
    requestConfig: AxiosRequestConfig
  ) {
    try {
      const newTokens = await refreshToken(refreshTokenStored!);

      await saveTokens(newTokens);

      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${newTokens.accessToken}`,
      };
    } catch (error: any) {
      if (retryCount >= MAX_RETRIES) {
        await deleteTokens();
        throw new UnauthenticatedError();
      }
    }
  }

  return instance;
}

async function getTokens(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
    };
  } else {
    return await getTokensAction();
  }
}

async function deleteTokens(): Promise<void> {
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } else {
    return await deleteTokensAction();
  }
}

async function saveTokens({ accessToken, refreshToken }: AuthTokens) {
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, tokensCookiesParams);
    cookieStore.set("refreshToken", refreshToken, tokensCookiesParams);
  } else {
    return await saveTokensAction({ accessToken, refreshToken });
  }
}

async function refreshToken(refreshToken: string): Promise<AuthTokens> {
  try {
    const api = await axiosInstance({ withoutRetry: true });
    const response = await api.post<{
      accessToken: string;
      refreshToken: string;
    }>("autenticacao/refresh-token", { refreshToken: refreshToken });

    const resultado = authTokensSchema.safeParse(response.data);
    if (!resultado.success) {
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  } catch {
    throw new UnauthenticatedError();
  }
}
