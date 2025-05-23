import { empresaService } from "@/services/empresa-service";
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
