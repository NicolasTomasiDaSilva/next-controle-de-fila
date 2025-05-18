import axios from "axios";
import { cookies } from "next/headers";

export async function axiosInstanceServer(
  headers: Record<string, string> = {}
): Promise<Axios.AxiosInstance> {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get("accessToken")?.value;

  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (config && config.headers) {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptador de requisição
  instance.interceptors.request.use((config) => {
    console.log("📤 Enviando requisição:");
    console.log("URL:", config.baseURL + config.url);
    console.log("Headers:", config.headers);
    console.log("Método:", config.method);
    console.log("Body:", config.data);
    return config;
  });

  // Interceptador de resposta
  instance.interceptors.response.use(
    (response) => {
      console.log("✅ Resposta recebida:");
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      console.log("Data:", response.data);
      return response;
    },
    (error) => {
      if (error.response) {
        console.log("❌ Erro na resposta:");
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
        console.log("Data:", error.response.data);
      } else {
        console.log("❌ Erro sem resposta:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
