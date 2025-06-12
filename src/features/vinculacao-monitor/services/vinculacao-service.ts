import { api } from "@/lib/api/api";
import { CriarVinculacaoDTO } from "@/features/vinculacao-monitor/dto/criar-vinculacao-dto";
import { Fila, filaSchema } from "@/features/shared/models/fila";

export const vinculacaoService = {
  async vincularMonitor(dados: CriarVinculacaoDTO): Promise<void> {
    try {
      await api.post("/vinculacoes", dados);
    } catch (error: any) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Codigo invalido"
      ) {
        throw new Error("Código não encontrado");
      }
      throw error;
    }
  },
};
