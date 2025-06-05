import { clienteSchema } from "@/features/fila/models/cliente";
import { filaSchema } from "@/features/fila/models/fila";
import z from "zod";

export const dataEventoHubAcaoClienteSchema = z.object({
  fila: filaSchema,
  cliente: clienteSchema,
});

export type dataEventoHubAcaoClienteDTO = z.infer<
  typeof dataEventoHubAcaoClienteSchema
>;
