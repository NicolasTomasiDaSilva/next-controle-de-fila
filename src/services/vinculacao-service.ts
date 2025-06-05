import { api } from "@/lib/api/api";
import { criarVinculacaoDTO } from "@/dtos/vinculacao";
import { Fila, filaSchema } from "@/models/fila";

export const vinculacaoService = {
  async vincularMonitor(dados: criarVinculacaoDTO): Promise<void> {
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
