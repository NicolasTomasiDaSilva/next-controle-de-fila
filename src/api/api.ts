import isServer from "../../src/utils/is-server";

import axios from "axios";

import axiosRetry from "axios-retry";

const MAX_RETRIES: number = 3;

const nextBaseUrl =
  process.env.NEXT_PUBLIC_NEXT_BASE_URL || "http://localhost:3000";

export async function axiosInstance(
  withoutRetry = false,
  headers: Record<string, string> = {}
): Promise<Axios.AxiosInstance> {
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

  if (withoutRetry) return instance;

  axiosRetry(instance, {
    retries: MAX_RETRIES,
    retryCondition: (error: any) =>
      error.response?.status === 401 &&
      !error.config?.url.includes("/api/autenticacao/refresh-token") &&
      !error.config?.url.includes("/api/auth/refresh-token"),

    onRetry: async (_, error) => {
      try {
        if (isServer()) {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          const refreshTokenStored = cookieStore.get("refreshToken")?.value;

          if (!refreshTokenStored) {
            throw error;
          }

          const refreshTokenUrl = `${nextBaseUrl}/api/auth/refresh-token`;

          const res = await axios.post(
            refreshTokenUrl,
            { refreshToken: refreshTokenStored }, // corpo da requisição
            {
              headers: {
                Cookie: `refreshToken=${refreshTokenStored}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log(
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          );
          console.log(res);
          console.log("RESPOSTA DA MINHA API");
          console.log(
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          );
          if (res.status !== 200) {
            throw error;
          }
        }
      } catch (err) {
        throw err;
      }
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

  return instance;
}
