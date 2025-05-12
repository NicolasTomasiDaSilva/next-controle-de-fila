import { axiosInstance } from "@/api/api";

export const filaService = {
  async obterFilaPorId(id: string) {
    const response = await axiosInstance().get(`/filas/${id}`);
    return response.data;
  },
};
