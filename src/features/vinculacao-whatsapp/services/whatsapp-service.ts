import { api } from "@/lib/axios/axios";
import {
  SessaoWhatsappDTO,
  sessaoWhatsappSchema,
} from "@/features/vinculacao-whatsapp/models/sessao-whatsapp-dto";
import {
  QrcodeResponseDTO,
  qrcodeResponseSchema,
} from "../models/qrcode-response-dto";

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

  async verificarStatusSessao(): Promise<SessaoWhatsappDTO> {
    try {
      return (await api.get<SessaoWhatsappDTO>(
        "/whatsapp/session/status",
        undefined,
        {
          schema: sessaoWhatsappSchema,
        }
      )) as SessaoWhatsappDTO;
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
    try {
      await api.post("/whatsapp/logout");
    } catch (error: any) {
      if (
        error.response?.status === 500 &&
        error.response?.data?.error === "no session"
      ) {
        return;
      } else {
        throw error;
      }
    }
  },

  async pegarQrCode(): Promise<QrcodeResponseDTO> {
    try {
      return (await api.get<QrcodeResponseDTO>("/whatsapp/qrcode", undefined, {
        schema: qrcodeResponseSchema,
      })) as QrcodeResponseDTO;
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
