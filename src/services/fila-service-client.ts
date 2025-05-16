import { axiosInstanceClient } from "@/api/axios-client";
import { AdicionarClienteDTO } from "@/dtos/cliente";
import { AcoesAdminEnum } from "@/enums/acoes-admin-enum";
import { Cliente } from "@/models/cliente";
import { Fila, filaSchema } from "@/models/fila";

export const filaService = {
  async AdicionarCliente(dto: AdicionarClienteDTO): Promise<Fila> {
    const api = await axiosInstanceClient();
    const response = await api.post(`/clientes`, dto);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },
  async AtualizarCliente(cliente: Cliente): Promise<Fila> {
    const api = await axiosInstanceClient();
    const response = await api.put(`/clientes`, cliente);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },

  async AtenderCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.AtenderClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },

  async RemoverCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.RemoverClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },
  async AusentarCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.AusentarClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },

  async VoltarCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.VoltarParaFilaClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },
  async ChamarCliente(id: string): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      ids: [id],
      acao: AcoesAdminEnum.ChamarClientes,
    };
    const response = await api.post(`/clientes/atualizar-status`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },

  async MoverCliente(id: string, novaPosicao: number): Promise<Fila> {
    const api = await axiosInstanceClient();
    const paylod = {
      id: id,
      novaPosicao: novaPosicao,
    };

    const response = await api.post(`/clientes/trocar-posicao`, paylod);
    const resultado = filaSchema.safeParse(response.data);
    if (!resultado.success) {
      console.error(resultado.error);
      throw new Error("Dados inválidos");
    }
    return resultado.data;
  },
};
