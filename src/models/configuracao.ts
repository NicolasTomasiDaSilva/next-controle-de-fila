import { Entidade, entidadeSchema } from "./entidade";
import { z } from "zod";

export const configuracaoSchema = entidadeSchema.extend({
  empresaId: z.string().uuid("ID da empresa inválido"),
  nomeDisplay: z.string().trim().min(4, "Nome deve ter no mínimo 4 caracteres"),
  whatsappAtivo: z.boolean(),
  enderecoDisplay: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable(),
  mensagemEntrada: z.string().trim().nullable(),
  mensagemChamada: z.string().trim().nullable(),
  mensagemRemovido: z.string().nullable(),
  logoUrl: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine(
      (val) =>
        val === null ||
        val === undefined ||
        z.string().url().safeParse(val).success,
      {
        message: "URL inválida",
      }
    ),
  corPrimaria: z.string().trim(),
  corSobreposicao: z.string().trim(),
});

export type Configuracao = z.infer<typeof configuracaoSchema>;
