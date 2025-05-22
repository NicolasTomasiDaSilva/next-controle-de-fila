import { axiosInstance } from "@/api/api";
import { AuthTokens, authTokensSchema } from "@/models/auth-tokens";
import axios from "axios";

export const empresaService = {
  async enviarCodigoAcesso(email: string): Promise<void> {
    try {
      const payload = {
        email,
      };
      const api = await axiosInstance({});
      await api.post(`/autenticacao/codigo-acesso`, payload);
    } catch (error: any) {
      console.log(error);
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

  async verificarCodigoAcesso(email: string, codigo: string): Promise<void> {
    try {
      const payload = {
        email,
        codigo,
      };

      await axios.post(
        `http://localhost:3000/api/autenticacao/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
