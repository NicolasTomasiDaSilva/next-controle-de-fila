import { codigoVinculacaoSchema } from "@/features/shared/models/values";
import { vinculacaoSchema } from "@/features/shared/models/vinculacao";
import z from "zod";

export const criarVinculacaoSchema = z.object({
  ...vinculacaoSchema.pick({ filaId: true, observacao: true }).shape,
  codigo: codigoVinculacaoSchema,
});
export type CriarVinculacaoDTO = z.infer<typeof criarVinculacaoSchema>;
