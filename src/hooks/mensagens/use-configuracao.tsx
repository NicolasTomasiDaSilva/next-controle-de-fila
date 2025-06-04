import { mensagensFormDTO } from "@/dtos/configuracao";
import { useEmpresa } from "../use-empresa";
import { toast } from "sonner";
import { empresaService } from "@/services/empresa-service";

export function useConfiguracao() {
  const { empresa } = useEmpresa();

  async function handleAtualizarMensagens(
    mensagensAtualizadas: mensagensFormDTO,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setIsSubmitting(true);
      const configuracaoAtualizada = {
        ...empresa.configuracao,
        ...mensagensAtualizadas,
      };
      await empresaService.atualizarConfiguracao(configuracaoAtualizada);
      toast.success("Mensagens salvas com sucesso.", { icon: "➕" });
    } catch (error: any) {
      toast.error("Erro ao salvar mensagens.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAtivarDesativarWhatsapp(
    mensagensAtualizadas: mensagensFormDTO,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setIsSubmitting(true);
      const configuracaoAtualizada = {
        ...empresa.configuracao,
        ...mensagensAtualizadas,
      };
      await empresaService.atualizarConfiguracao(configuracaoAtualizada);
      toast.success("Mensagens salvas com sucesso.", { icon: "➕" });
    } catch (error: any) {
      toast.error("Erro ao salvar mensagens.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { configuracao: empresa.configuracao, handleAtualizarMensagens };
}
