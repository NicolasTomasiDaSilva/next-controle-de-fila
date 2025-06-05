import z from "zod";

export const codigoAcessoSchema = z.object({
  // Aceita apenas números, exatamente 6 dígitos
  codigo: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});

export type codigoAcessoDTO = z.infer<typeof codigoAcessoSchema>;
