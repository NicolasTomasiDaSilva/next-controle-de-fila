import { clienteSchema } from "@/features/shared/models/cliente";
import { z } from "zod";

export const adicionarClienteSchema = clienteSchema.pick({
  filaId: true,
  nome: true,
  telefone: true,
  observacao: true,
});

export type AdicionarClienteDTO = z.infer<typeof adicionarClienteSchema>;
