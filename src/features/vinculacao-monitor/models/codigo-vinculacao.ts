import z from "zod";

export const codigoVinculacaoSchema = z.object({
  // Aceita letras e números (alfanumérico), exatamente 4 caracteres
  codigo: z.string().regex(/^[a-zA-Z0-9]{4}$/, { message: "Código inválido" }),
});

export type codigoVinculacaoDTO = z.infer<typeof codigoVinculacaoSchema>;
