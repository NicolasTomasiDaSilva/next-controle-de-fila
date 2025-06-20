import { api } from "@/lib/axios/axios";

import { AcoesAdminEnum } from "@/lib/enums/acoes-admin-enum";
import { Cliente } from "@/features/shared/models/cliente";
import { Fila, filaSchema } from "@/features/shared/models/fila";
import { AdicionarClienteDTO } from "../models/adicionar-cliente-dto";

export const filaService = {
  async obterFilaPorId(id: string): Promise<Fila> {
    return (await api.get<Fila>(`/filas/${id}`, undefined, {
      schema: filaSchema,
    })) as Fila;
  },

  async adicionarCliente(dto: AdicionarClienteDTO): Promise<Fila> {
    return (await api.post<Fila, AdicionarClienteDTO>(`/clientes`, dto, {
      schema: filaSchema,
    })) as Fila;
  },

  async atualizarDadosCliente(cliente: Cliente): Promise<Fila> {
    return (await api.put<Fila, Cliente>(`/clientes`, cliente, {
      schema: filaSchema,
    })) as Fila;
  },

  async atualizarStatusCliente(
    id: string,
    acao: AcoesAdminEnum
  ): Promise<Fila> {
    return (await api.post<Fila>(
      `/clientes/atualizar-status`,
      {
        id: id,
        acao: acao,
      },
      {
        schema: filaSchema,
      }
    )) as Fila;
  },

  async MoverCliente(id: string, novaPosicao: number): Promise<Fila> {
    return (await api.post<Fila>(
      `/clientes/trocar-posicao`,
      {
        id: id,
        novaPosicao: novaPosicao,
      },
      {
        schema: filaSchema,
      }
    )) as Fila;
  },
};
