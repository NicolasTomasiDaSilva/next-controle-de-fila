import { clienteSchema } from "@/features/shared/models/cliente";
import { filaSchema } from "@/features/shared/models/fila";
import z from "zod";

export const dataEventoClienteDesistirSchema = z.object({
  fila: filaSchema,
  cliente: clienteSchema,
});

export type DataEventoClienteDesistirDTO = z.infer<
  typeof dataEventoClienteDesistirSchema
>;
