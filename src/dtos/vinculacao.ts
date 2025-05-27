import { codigoVinculacaoSchema } from "@/models/codigos";
import { vinculacaoSchema } from "@/models/vinculacao";
import z from "zod";

export const criarVinculacaoSchema = z.object({
  ...vinculacaoSchema.pick({ filaId: true, observacao: true }).shape,
  ...codigoVinculacaoSchema.shape,
});
export type criarVinculacaoDTO = z.infer<typeof criarVinculacaoSchema>;
