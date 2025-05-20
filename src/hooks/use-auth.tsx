import { AuthTokens } from "@/models/auth-tokens";
import { empresaService } from "@/services/empresa-service-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  async function login({ email, codigo }: { email: string; codigo: string }) {
    await empresaService.verificarCodigoAcesso(email, codigo);
    router.push("/fila");
  }

  function logout(): void {}

  return { login, logout };
};
