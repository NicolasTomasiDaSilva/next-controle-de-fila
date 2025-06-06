import { empresaService } from "@/features/shared/services/empresa-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { autenticacaoService } from "../services/autenticacao-service";
import { useState } from "react";
import { delayBotao } from "@/utils/delay-botao";

export const useLogout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function logout() {
    try {
      setIsSubmitting(true);
      await autenticacaoService.logout();
      router.push("/login");
      toast.success("Deslogado com sucesso.", { icon: "🔓" });
    } catch (error) {
      toast.error("Erro ao deslogar.");
    } finally {
      await delayBotao(1000);
      setIsSubmitting(false);
    }
  }
  return { logout, isSubmitting };
};
