import { axiosInstance } from "@/api/api";
import { AdicionarClienteDTO } from "@/dtos/cliente";

export const filaService = {
  async obterFilaPorId(id: string) {
    const api = await axiosInstance();
    const response = await api.get(`/filas/${id}`);
    return response.data;
  },

  async AdicionarCliente(dto: AdicionarClienteDTO) {
    const api = await axiosInstance();
    const response = await api.post(`/clientes`, dto);
    return response.data;
  },
};
