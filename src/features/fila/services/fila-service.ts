import { api } from "@/lib/api/api";
import { AdicionarClienteDTO } from "@/dtos/cliente";
import { AcoesAdminEnum } from "@/enums/acoes-admin-enum";
import { Cliente } from "@/features/shared/models/cliente";
import { Fila, filaSchema } from "@/features/shared/models/fila";

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
        ids: [id],
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
