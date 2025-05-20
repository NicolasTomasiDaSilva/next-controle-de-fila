import { axiosInstance } from "@/api/api";
import { Empresa, empresaSchema } from "@/models/empresa";

export const empresaService = {
  async obterEmpresa(): Promise<Empresa> {
    try {
      const api = await axiosInstance();
      const response = await api.get(`/empresas`);
      const resultado = empresaSchema.safeParse(response.data);
      if (!resultado.success) {
        throw new Error("Dados inválidos");
      }
      return resultado.data;
    } catch (error: any) {
      throw error;
    }
  },
};
