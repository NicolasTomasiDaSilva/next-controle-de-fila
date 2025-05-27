import { api } from "@/api/api";
import { Fila, filaSchema } from "@/models/fila";

export const vinculacaoService = {
  async vincularMonitor(id: string): Promise<Fila> {
    return (await api.get<Fila>(`/filas/${id}`, undefined, {
      schema: filaSchema,
    })) as Fila;
  },
};
