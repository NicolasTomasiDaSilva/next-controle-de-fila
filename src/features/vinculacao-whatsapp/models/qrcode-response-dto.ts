import z from "zod";

export const qrcodeResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    QRCode: z.string(),
  }),
  success: z.boolean(),
});

export type QrcodeResponseDTO = z.infer<typeof qrcodeResponseSchema>;
