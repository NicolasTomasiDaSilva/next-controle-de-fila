import z from "zod";

export const sessaoWhatsappSchema = z.object({
  code: z.number(),
  data: z.object({
    connected: z.boolean(),
    loggedIn: z.boolean(),
    qrcode: z.string(),
  }),
  success: z.boolean(),
});

export type sessaoWhatsappDTO = z.infer<typeof sessaoWhatsappSchema>;

export const qrcodeResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    QRCode: z.string(),
  }),
  success: z.boolean(),
});

export type qrcodeResponseDTO = z.infer<typeof qrcodeResponseSchema>;
