import { Api, axiosInstance } from "@/api/api";
import { Fila, filaSchema } from "@/models/fila";

export const filaService = {
  async obterFilaPorId(id: string): Promise<Fila> {
    try {
      const response = await Api.get(`/filas/${id}`);
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
