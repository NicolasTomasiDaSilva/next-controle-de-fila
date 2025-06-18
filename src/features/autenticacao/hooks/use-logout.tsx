import { empresaService } from "@/features/shared/services/empresa-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { autenticacaoService } from "../services/autenticacao-service";
import { useState } from "react";
import { delayBotao } from "@/lib/utils/delay-botao";

export const useLogout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function logout() {
    try {
      setIsSubmitting(true);
      await autenticacaoService.logout();
      router.push("/login");
    } catch (error) {
      toast.error("Erro ao deslogar.");
      setIsSubmitting(false);
    }
  }

  return { logout, isSubmitting };
};
