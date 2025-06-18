import {
  Configuracao,
  configuracaoSchema,
} from "@/features/shared/models/configuracao";
import { Empresa, empresaSchema } from "@/features/shared/models/empresa";
import { api, axiosInstance } from "@/lib/axios/axios";

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
};
