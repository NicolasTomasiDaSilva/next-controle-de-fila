import { AuthTokens } from "@/models/auth-tokens";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  function login({ accessToken, refreshToken }: AuthTokens): void {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    router.push("/fila");
  }
  function logout(): void {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  }

  return { login, logout };
};
