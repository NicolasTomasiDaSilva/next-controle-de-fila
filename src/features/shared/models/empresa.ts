import { z } from "zod";
import { configuracaoSchema } from "./configuracao";
import { entidadeSchema } from "./entidade";
import { filaSchema } from "@/features/fila/models/fila";
import { vinculacaoSchema } from "@/features/vinculacao-monitor/models/vinculacao";

export const empresaSchema = entidadeSchema.extend({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  cpfCnpj: z
    .string()
    .trim()
    .refine((val) => val.length === 11 || val.length === 14, {
      message:
        "Cpf/Cnpj deve conter exatamente 11 (CPF) ou 14 (CNPJ) caracteres",
    }),
  email: z.string().trim().email("E-mail inválido").toLowerCase(),
  filas: z.array(filaSchema),
  vinculacoes: z.array(vinculacaoSchema),
  configuracao: configuracaoSchema,
});

export type Empresa = z.infer<typeof empresaSchema>;
