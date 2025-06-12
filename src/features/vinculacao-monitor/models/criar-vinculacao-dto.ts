import { vinculacaoSchema } from "@/features/shared/models/vinculacao";
import z from "zod";
import { codigoVinculacaoSchema } from "./values";

export const criarVinculacaoSchema = z.object({
  ...vinculacaoSchema.pick({ filaId: true, observacao: true }).shape,
  codigo: codigoVinculacaoSchema,
});
export type criarVinculacaoDTO = z.infer<typeof criarVinculacaoSchema>;
