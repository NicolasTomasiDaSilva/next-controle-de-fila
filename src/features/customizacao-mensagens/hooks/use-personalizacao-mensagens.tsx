import { useEmpresa } from "../../shared/hooks/use-empresa";
import { toast } from "sonner";
import { empresaService } from "@/features/shared/services/empresa-service";
import { useState } from "react";
import { MensagensFormDTO } from "../models/mensagens-form-dto";

export function usePersonalizacaoMensagens() {
  const { empresa } = useEmpresa();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAtualizarMensagens(
    mensagensAtualizadas: MensagensFormDTO
  ) {
    try {
      setIsSubmitting(true);
      const configuracaoAtualizada = {
        ...empresa.configuracao,
        ...mensagensAtualizadas,
      };
      await empresaService.atualizarConfiguracao(configuracaoAtualizada);
      toast.success("Configurações salvas com sucesso.");
    } catch (error: any) {
      toast.error("Erro ao salvar configuraçôes.");
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
