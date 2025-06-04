import { empresaService } from "@/services/empresa-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  async function logout() {
    try {
      await empresaService.logout();
      router.push("/login");
      toast.success("Deslogado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deslogar.");
    }
  }
  return { logout };
};
