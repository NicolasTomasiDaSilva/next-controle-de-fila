import deleteTokensAction from "@/actions/cookies/delete-tokens-action";
import getTokensAction from "@/actions/cookies/get-tokens-action";
import saveTokensAction from "@/actions/cookies/save-tokens-action";
import { UnauthenticatedError } from "@/errors/errors";
import { AuthTokens, authTokensSchema } from "@/models/auth-tokens";
import isServer from "@/utils/is-server";
import { tokensCookiesParams } from "@/utils/tokens-cookies-params";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axiosRetry from "axios-retry";
import { redirect } from "next/navigation";

export const Api = {
  get: get,
  post: post,
  put: put,
  delete: del,
  refreshToken: refreshToken,
};

const MAX_RETRIES: number = 3;

export function axiosInstance({
  withoutRetry = false,
  headers = {},
}: {
  withoutRetry?: boolean;
  headers?: Record<string, string>;
}): AxiosInstance {
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

  axiosRetry(instance, {
    retries: MAX_RETRIES,
    retryCondition: (error: any) => {
      return error.response?.status === 401;
    },
    onRetry: onRetry,
  });

  return instance;
}

async function onRetry(
  retryCount: number,
  error: AxiosError,
  requestConfig: AxiosRequestConfig
) {
  try {
    const { refreshToken: refreshTokenStored } = await getTokens();
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
    // const { cookies } = await import("next/headers");
    // const cookieStore = await cookies();
    // cookieStore.delete("accessToken");
    // cookieStore.delete("refreshToken");
  } else {
    return await deleteTokensAction();
  }
}

async function saveTokens({ accessToken, refreshToken }: AuthTokens) {
  if (isServer()) {
    // const { cookies } = await import("next/headers");
    // const cookieStore = await cookies();
    // cookieStore.set("accessToken", accessToken, tokensCookiesParams);
    // cookieStore.set("refreshToken", refreshToken, tokensCookiesParams);
  } else {
    return await saveTokensAction({ accessToken, refreshToken });
  }
}

async function refreshToken(refreshToken: string): Promise<AuthTokens> {
  try {
    const api = await axiosInstance({ withoutRetry: true });
    const response = await api.post("autenticacao/refresh-token", {
      refreshToken: refreshToken,
    });

    const resultado = authTokensSchema.safeParse(response.data);

    if (!resultado.success) {
      throw new Error("Dados inválidos");
    }

    return resultado.data;
  } catch {
    throw new UnauthenticatedError();
  }
}

async function get(
  endpoint: string,
  queryParams?: Map<string, string | string[]>,
  headers?: Record<string, string>
): Promise<AxiosResponse> {
  return await request({
    endpoint: endpoint,
    method: "GET",
    queryParams: queryParams,
    headers: headers,
  });
}

async function post(
  endpoint: string,
  data?: any,
  queryParams?: Map<string, string | string[]>,
  headers?: Record<string, string>
): Promise<AxiosResponse> {
  return await request({
    endpoint: endpoint,
    method: "POST",
    data: data,
    queryParams: queryParams,
    headers: headers,
  });
}

async function put(
  endpoint: string,
  data?: any,
  queryParams?: Map<string, string | string[]>,
  headers?: Record<string, string>
): Promise<AxiosResponse> {
  return await request({
    endpoint: endpoint,
    method: "PUT",
    data: data,
    queryParams: queryParams,
    headers: headers,
  });
}

async function del(
  endpoint: string,
  data?: any,
  queryParams?: Map<string, string | string[]>,
  headers?: Record<string, string>
): Promise<AxiosResponse> {
  return await request({
    endpoint: endpoint,
    method: "DELETE",
    data: data,
    queryParams: queryParams,
    headers: headers,
  });
}

async function request({
  endpoint,
  method,
  data,
  queryParams,
  headers,
}: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  queryParams?: Map<string, string | string[]>;
  headers?: Record<string, string>;
}): Promise<AxiosResponse> {
  try {
    if (queryParams) {
      const params = new URLSearchParams();
      queryParams.forEach((values, key) => {
        if (Array.isArray(values)) {
          values.forEach((value) => {
            params.append(key, value);
          });
        } else {
          params.append(key, values);
        }
      });

      endpoint = endpoint + "?" + params.toString();
    }

    const instance = axiosInstance({ headers: headers });

    const { accessToken: accessTokenStored } = await getTokens();

    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessTokenStored}`;

    const response: AxiosResponse = await instance.request({
      method: method,
      url: endpoint,
      data: data,
      params: queryParams,
    });

    return response;
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      if (isServer()) {
        redirect("/login");
      } else {
        window.location.href = "/login";
      }
    }
    throw error;
  }
}
