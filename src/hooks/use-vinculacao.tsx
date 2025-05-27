import { criarVinculacaoDTO } from "@/dtos/vinculacao";

import { vinculacaoService } from "@/services/vinculacao-service";

export const useVinculacao = () => {
  async function vincularMonitor(dto: criarVinculacaoDTO) {
    await vinculacaoService.vincularMonitor(dto);
  }

  return { vincularMonitor };
};
