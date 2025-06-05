import { mensagensFormDTO } from "@/dtos/configuracao";
import { useEmpresa } from "../../shared/hooks/use-empresa";
import { toast } from "sonner";
import { empresaService } from "@/services/empresa-service";
import { useState } from "react";

export function usePersonalizacaoMensagens() {
  const { empresa } = useEmpresa();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAtualizarMensagens(
    mensagensAtualizadas: mensagensFormDTO
  ) {
    try {
      setIsSubmitting(true);
      const configuracaoAtualizada = {
        ...empresa.configuracao,
        ...mensagensAtualizadas,
      };
      await empresaService.atualizarConfiguracao(configuracaoAtualizada);
      toast.success("Mensagens salvas com sucesso.", { icon: "💾" });
    } catch (error: any) {
      toast.error("Erro ao salvar mensagens.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    configuracao: empresa.configuracao,
    handleAtualizarMensagens,
    isSubmitting,
  };
}
