import { clienteSchema } from "@/features/shared/models/cliente";
import { filaSchema } from "@/features/shared/models/fila";
import z from "zod";

export const dataEventoHubAcaoClienteSchema = z.object({
  fila: filaSchema,
  cliente: clienteSchema,
});

export type DataEventoHubAcaoClienteDTO = z.infer<
  typeof dataEventoHubAcaoClienteSchema
>;
