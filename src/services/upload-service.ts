export const uploadService = {
  async uploadImagem(formData: FormData): Promise<{
    url: string;
  }> {
    return {
      url: "/images/logo-sistema.png",
    };
  },
};
