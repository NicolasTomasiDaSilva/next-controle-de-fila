import { axiosInstance } from "@/api/api";

export const filaService = {
  async obterFilaPorId(id: string) {
    const api = await axiosInstance();
    const response = await api.get(`/filas/${id}`);
    return response.data;
  },
};
