import { api, axiosInstance } from "@/api/api";
import { Configuracao, configuracaoSchema } from "@/models/configuracao";
import { Empresa, empresaSchema } from "@/models/empresa";
import axios from "axios";
import { Config } from "tailwind-merge";

export const empresaService = {
  async obterEmpresa(): Promise<Empresa> {
    return (await api.get<Empresa>(`/empresas`, undefined, {
      schema: empresaSchema,
    })) as Empresa;
  },

  async atualizarConfiguracao(
    configuracao: Configuracao
  ): Promise<Configuracao> {
    return (await api.put<Configuracao, Configuracao>(
      `/configuracoes`,
      configuracao,
      {
        schema: configuracaoSchema,
      }
    )) as Configuracao;
  },

  async enviarCodigoAcesso(email: string): Promise<void> {
    try {
      const payload = {
        email,
      };
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

  async verificarCodigoAcesso(email: string, codigo: string): Promise<void> {
    try {
      const payload = {
        email,
        codigo,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}/autenticacao/login`,
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
  async logout(): Promise<void> {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}/autenticacao/logout`,
        undefined,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      throw error;
    }
  },
};
