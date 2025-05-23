export const uploadService = {
  async uploadImagem(formData: FormData): Promise<{
    url: string;
  }> {
    return {
      url: "https://avatars.githubusercontent.com/u/198528008?s=400&u=42dc338b18eeb77486dbe5a3c816808528c7d736&v=4",
    };
  },
};
