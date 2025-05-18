import { axiosInstanceServer } from "@/api/axios-server";
import { Empresa, empresaSchema } from "@/models/empresa";

export const empresaService = {
  async obterEmpresa(): Promise<Empresa> {
    const api = await axiosInstanceServer();
    const response = await api.get(`/empresas`);
    const resultado = empresaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },
  async enviarCodigoAcesso(email: string): Promise<void> {
    const payload = {
      email,
    };
    const api = await axiosInstanceServer();
    const response = await api.post(`/api/autenticacao/codigo-acesso`, payload);
    if (response.status != 200) {
      throw new Error("Erro ao gerar código de acesso.");
    }
  },
};
