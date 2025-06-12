import { entidadeSchema } from "@/features/shared/models/entidade";
import { StatusEnum } from "../../../enums/status-enum";

import { z } from "zod";
import { texto } from "./values";

export const statusEnumSchema = z.nativeEnum(StatusEnum);

export const clienteSchema = entidadeSchema.extend({
  filaId: z.string().uuid(),
  nome: texto({ campo: "Nome do Cliente", min: 1, max: 50 }),
  observacao: texto({
    campo: "Observação",
    min: 1,
    max: 30,
    transformarEmNull: true,
  }),
  telefone: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .refine((val) => val === null || (val.length >= 10 && val.length <= 11), {
      message: "Telefone deve ter entre 10 e 11 caracteres",
    })
    .nullable(),
  hash: z.string().min(1),
  posicao: z.number().nullable(),
  status: statusEnumSchema,
  dataHoraOrdenacao: z.coerce.date(),
  dataHoraChamada: z.coerce.date().nullable(),
});

export type Cliente = z.infer<typeof clienteSchema>;
