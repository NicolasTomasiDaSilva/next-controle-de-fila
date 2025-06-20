import { api } from "@/lib/axios/axios";

import {
  EstatisticasFilaDTO,
  EstatisticasFilaSchema,
} from "../models/estatisticas-fila";

export const estatisticasService = {
  async obterEstatisticasFilaPorId(id: string): Promise<EstatisticasFilaDTO> {
    return (await api.get<EstatisticasFilaDTO>(
      `/filas/estatisticas/${id}`,
      undefined,
      {
        schema: EstatisticasFilaSchema,
      }
    )) as EstatisticasFilaDTO;
  },
};
