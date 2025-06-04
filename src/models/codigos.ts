import z from "zod";

export const codigoAcessoSchema = z.object({
  // Aceita apenas números, exatamente 6 dígitos
  codigo: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});

export type codigoAcessoDTO = z.infer<typeof codigoAcessoSchema>;

export const codigoVinculacaoSchema = z.object({
  // Aceita letras e números (alfanumérico), exatamente 4 caracteres
  codigo: z.string().regex(/^[a-zA-Z0-9]{4}$/, { message: "Código inválido" }),
});

export type codigoVinculacaoDTO = z.infer<typeof codigoVinculacaoSchema>;
