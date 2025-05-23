import { Entidade, entidadeSchema } from "./entidade";
import { z } from "zod";

export const configuracaoSchema = entidadeSchema.extend({
  empresaId: z.string().uuid("ID da empresa inválido"),
  nomeDisplay: z.string().trim().min(1, "Nome de exibição obrigatório"),
  whatsappAtivo: z.boolean(),
  enderecoDisplay: z.string().trim().nullable(),
  mensagemEntrada: z.string().trim().nullable(),
  mensagemChamada: z.string().trim().nullable(),
  mensagemRemovido: z.string().nullable(),
  logoUrl: z.string().trim().url().nullable(),
  corPrimaria: z.string().trim(),
  corSobreposicao: z.string().trim(),
});

export type Configuracao = z.infer<typeof configuracaoSchema>;
