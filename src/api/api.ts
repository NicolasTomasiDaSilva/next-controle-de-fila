import getTokensAction from "@/actions/cookies/get-tokens-action";
import isServer from "@/utils/is-server";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import axiosRetry from "axios-retry";

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
      const response = await axios.post(
        "http://localhost:3000/api/autenticacao/refresh-token",
        {
          refreshToken: refreshTokenStored,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { accessToken: newAccessToken } = response.data;

      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
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
