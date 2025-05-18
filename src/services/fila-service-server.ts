import { axiosInstanceServer } from "@/api/axios-server";
import { Fila, filaSchema } from "@/models/fila";

export const filaService = {
  async obterFilaPorId(id: string): Promise<Fila> {
    try {
      const api = await axiosInstanceServer();
      const response = await api.get(`/filas/${id}`);
      const resultado = filaSchema.safeParse(response.data);
      if (!resultado.success) {
        console.error(resultado.error);
        throw new Error("Dados inválidos");
      }
      return resultado.data;
    } catch (error: any) {
      throw error;
    }
  },
};
