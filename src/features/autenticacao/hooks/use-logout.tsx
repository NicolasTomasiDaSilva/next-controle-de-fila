import { empresaService } from "@/features/shared/services/empresa-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { autenticacaoService } from "../services/autenticacao-service";

export const useLogout = () => {
  const router = useRouter();
  async function logout() {
    try {
      await autenticacaoService.logout();
      router.push("/login");
      toast.success("Deslogado com sucesso.", { icon: "🔓" });
    } catch (error) {
      toast.error("Erro ao deslogar.");
    }
  }
  return { logout };
};
