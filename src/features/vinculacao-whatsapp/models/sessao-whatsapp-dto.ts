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

export type SessaoWhatsappDTO = z.infer<typeof sessaoWhatsappSchema>;
