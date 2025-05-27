import { vinculacaoSchema } from "@/models/vinculacao";
import z from "zod";

export const vinculacaoFormSchema = vinculacaoSchema
  .pick({
    filaId: true,
    observacao: true,
  })
  .extend({
    codigo: z.string().regex(/^\d{4}$/, "Código deve ter exatamente 4 dígitos"),
  });
