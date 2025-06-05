import { api } from "@/lib/api/api";
import {
  qrcodeResponseDTO,
  qrcodeResponseSchema,
  sessaoWhatsappDTO,
  sessaoWhatsappSchema,
} from "@/dtos/whatsapp";

export const whatsappService = {
  async cadastrarWhatsapp(): Promise<void> {
    try {
      await api.post("/whatsapp");
    } catch (error: any) {
      if (
        error.response?.status === 409 &&
        error.response?.data?.error === "user with this token already exists"
      ) {
        return;
      }
      throw error;
    }
  },

  async verificarStatusSessao(): Promise<sessaoWhatsappDTO> {
    try {
      return (await api.get<sessaoWhatsappDTO>(
        "/whatsapp/session/status",
        undefined,
        {
          schema: sessaoWhatsappSchema,
        }
      )) as sessaoWhatsappDTO;
    } catch (error: any) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.error === "unauthorized"
      ) {
        throw new Error("Usuário não cadastrado");
      }
      throw error;
    }
  },

  async desconectarWhatsapp(): Promise<void> {
    await api.post("/whatsapp/logout");
  },

  async pegarQrCode(): Promise<qrcodeResponseDTO> {
    try {
      return (await api.get<qrcodeResponseDTO>("/whatsapp/qrcode", undefined, {
        schema: qrcodeResponseSchema,
      })) as qrcodeResponseDTO;
    } catch (error: any) {
      if (
        error.response?.status === 500 &&
        error.response?.data?.error === "no session"
      ) {
        throw new Error("Sem sessão");
      } else if (
        error.response?.status === 500 &&
        error.response?.data?.error === "already logged in"
      ) {
        throw new Error("Conectado");
      } else {
        throw error;
      }
    }
  },
  async iniciarSessao(): Promise<void> {
    try {
      await api.post("/whatsapp/connect");
    } catch (error: any) {
      if (
        error.response?.status === 500 &&
        error.response?.data?.error === "already connected"
      ) {
        return;
      } else {
        throw error;
      }
    }
  },
};
