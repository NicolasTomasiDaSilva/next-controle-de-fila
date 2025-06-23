import { codigoVinculacaoSchema, texto } from "@/features/shared/models/values";
import z from "zod";

export const criarVinculacaoSchema = z.object({
  filaId: z.string().uuid(),
  observacao: texto({
    campo: "Observação",
    min: 1,
    max: 30,
    transformarEmNull: true,
  }),
  codigo: codigoVinculacaoSchema,
});
export type CriarVinculacaoDTO = z.infer<typeof criarVinculacaoSchema>;
