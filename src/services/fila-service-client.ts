import { axiosInstanceClient } from "@/api/axios-client";
import { AdicionarClienteDTO } from "@/dtos/cliente";
import { AcoesAdminEnum } from "@/enums/acoes-admin-enum";
import { Fila, mapFila } from "@/models/fila";

export const filaService = {
  async AdicionarCliente(dto: AdicionarClienteDTO): Promise<Fila> {
    const api = await axiosInstanceClient();
    const response = await api.post(`/clientes`, dto);
    return mapFila(response.data);
  },

  async RemoverCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.RemoverClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    return mapFila(response.data);
  },
  async ChamarCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.ChamarClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    return mapFila(response.data);
  },

  async MoverCliente(id: string, novaPosicao: number): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      id: id,
      novaPosicao: novaPosicao,
    };

    const response = await api.post(`/clientes/trocar-posicao`, paylod);
    return mapFila(response.data);
  },
};
