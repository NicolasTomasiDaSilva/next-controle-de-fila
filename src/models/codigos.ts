import z from "zod";

export const codigoAcessoSchema = z.object({
  codigo: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});

export type codigoAcessoDTO = z.infer<typeof codigoAcessoSchema>;

export const codigoVinculacaoSchema = z.object({
  codigo: z.string().regex(/^\d{4}$/, { message: "Código inválido" }),
});

export type codigoVinculacaoDTO = z.infer<typeof codigoVinculacaoSchema>;
