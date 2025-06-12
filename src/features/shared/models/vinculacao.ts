import { entidadeSchema } from "@/features/shared/models/entidade";
import { z } from "zod";
import { texto } from "./values";

export const vinculacaoSchema = entidadeSchema.extend({
  idVinculacao: z.string().uuid(),
  empresaId: z.string().uuid(),
  filaId: z.string().uuid(),
  observacao: texto({
    campo: "Observação",
    min: 1,
    max: 30,
    transformarEmNull: true,
  }),
});

export type Vinculacao = z.infer<typeof vinculacaoSchema>;
