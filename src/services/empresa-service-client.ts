import { axiosInstance } from "@/api/api";
import { AuthTokens, authTokensSchema } from "@/models/auth-tokens";

export const empresaService = {
  async enviarCodigoAcesso(email: string): Promise<void> {
    try {
      const payload = {
        email,
      };
      const api = await axiosInstance();
      await api.post(`/autenticacao/codigo-acesso`, payload);
    } catch (error: any) {
      if (
        error.response?.status === 404 &&
        error.response?.data?.message === "Empresa nao encontrada"
      ) {
        throw new Error("E-mail não encontrado");
      } else {
        throw error;
      }
    }
  },

  async verificarCodigoAcesso(
    email: string,
    codigo: string
  ): Promise<AuthTokens> {
    try {
      const payload = {
        email,
        codigo,
      };
      const api = await axiosInstance();
      const response = await api.post(`/autenticacao/login`, payload);
      const resultado = authTokensSchema.safeParse(response.data);
      if (!resultado.success) {
        throw new Error("Dados inválidos");
      }
      return resultado.data;
    } catch (error: any) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Codigo invalido"
      ) {
        throw new Error("Código não encontrado");
      } else {
        throw error;
      }
    }
  },
};
