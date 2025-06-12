import { clienteSchema } from "@/features/shared/models/cliente";
import { filaSchema } from "@/features/shared/models/fila";
import z from "zod";

export const dataEventoHubAcaoClienteSchema = z.object({
  fila: filaSchema,
  cliente: clienteSchema,
});

export type dataEventoHubAcaoClienteDTO = z.infer<
  typeof dataEventoHubAcaoClienteSchema
>;
