import { api } from "@/lib/api/api";

export const uploadService = {
  async uploadImagem(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("imagem", file);
    const { url } = (await api.post("/upload/imagem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })) as { url: string };
    return url;
  },
};
