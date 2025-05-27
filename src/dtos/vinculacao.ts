import { codigoVinculacaoSchema } from "@/models/codigos";
import { vinculacaoSchema } from "@/models/vinculacao";
import z from "zod";

export const criarVinculacaoSchema = vinculacaoSchema
  .pick({
    filaId: true,
    observacao: true,
  })
  .extend({
    codigo: codigoVinculacaoSchema,
  });
