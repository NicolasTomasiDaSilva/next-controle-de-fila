import { codigoVinculacaoSchema } from "@/features/vinculacao-monitor/models/codigo-vinculacao";
import { vinculacaoSchema } from "@/features/vinculacao-monitor/models/vinculacao";
import z from "zod";

export const criarVinculacaoSchema = z.object({
  ...vinculacaoSchema.pick({ filaId: true, observacao: true }).shape,
  ...codigoVinculacaoSchema.shape,
});
export type criarVinculacaoDTO = z.infer<typeof criarVinculacaoSchema>;
