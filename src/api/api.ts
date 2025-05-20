import getTokensAction from "@/actions/cookies/get-tokens-action";
import isServer from "../../src/utils/is-server";

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import axiosRetry from "axios-retry";
import { AuthTokens, authTokensSchema } from "@/models/auth-tokens";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import saveTokensAction from "@/actions/cookies/save-tokens-action";

const MAX_RETRIES: number = 3;

export async function axiosInstance(
  withoutRetry: boolean = false,
  headers: Record<string, string> = {}
): Promise<AxiosInstance> {
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

  const { accessToken: accessTokenStored } = await getTokens();

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

  instance.interceptors.request.use((config) => {
    console.log("📤 [Request]");
    console.log("➡️ URL:", config.url);
    console.log("➡️ Method:", config.method);
    console.log("➡️ Headers:", config.headers);
    console.log("➡️ Data:", config.data);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      console.log("✅ [Response]");
      console.log("⬅️ URL:", response.config.url);
      console.log("⬅️ Status:", response.status);
      console.log("⬅️ Data:", response.data);
      console.log("⬅️ Headers:", response.headers);
      return response;
    },
    (error) => {
      if (error.response) {
        console.log("❌ [Response Error]");
        console.log("⬅️ URL:", error.config?.url);
        console.log("⬅️ Status:", error.response.status);
        console.log("⬅️ Data:", error.response.data);
        console.log("⬅️ Headers:", error.response.headers);
      } else {
        console.log("❌ [Network Error]");
        console.log(error.message);
      }
      return Promise.reject(error);
    }
  );
  async function onRetry(
    retryCount: number,
    error: AxiosError,
    requestConfig: AxiosRequestConfig
  ) {
    try {
      const { refreshToken: refreshTokenStored } = await getTokens();

      if (!refreshTokenStored) {
        throw error;
      }

      const newTokens = await refreshToken(refreshTokenStored);
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${newTokens.accessToken}`,
      };
      await saveTokens(newTokens);
    } catch (err) {
      throw err;
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
    const cookiesStore = await cookies();

    return {
      accessToken: cookiesStore.get("accessToken")?.value,
      refreshToken: cookiesStore.get("refreshToken")?.value,
    };
  } else {
    return await getTokensAction();
  }
}

async function saveTokens({
  accessToken,
  refreshToken,
}: AuthTokens): Promise<void> {
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const cookiesStore = await cookies();

    cookiesStore.set("accessToken", accessToken, tokensCookiesParams);
    cookiesStore.set("refreshToken", refreshToken, tokensCookiesParams);
  } else {
    return await saveTokensAction({ accessToken, refreshToken });
  }
}

async function refreshToken(refreshToken: string): Promise<AuthTokens> {
  try {
    const api = await axiosInstance(true);
    const response = await api.post("/autenticacao/refresh-token", {
      refreshToken,
    });

    const resultado = authTokensSchema.safeParse(response.data);
    if (!resultado.success) {
      throw new Error("Dados inválidos");
    }
    console.log("DEU CERTO NOVOS TOKENS");
    return resultado.data;
  } catch (error) {
    throw error;
  }
}
