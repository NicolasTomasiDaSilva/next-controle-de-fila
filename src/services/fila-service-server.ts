import { axiosInstanceServer } from "@/api/axios-server";
import { Fila, mapFila } from "@/models/fila";

export const filaService = {
  async obterFilaPorId(id: string): Promise<Fila> {
    const api = await axiosInstanceServer();
    const response = await api.get(`/filas/${id}`);
    return mapFila(response.data);
  },
};
