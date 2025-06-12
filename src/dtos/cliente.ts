import { clienteSchema } from "@/features/shared/models/cliente";
import { z } from "zod";

export const adicionarClienteSchema = clienteSchema.pick({
  filaId: true,
  nome: true,
  telefone: true,
  observacao: true,
});

export type AdicionarClienteDTO = z.infer<typeof adicionarClienteSchema>;

export const clienteFormSchema = clienteSchema.pick({
  nome: true,
  telefone: true,
  observacao: true,
});

export type ClienteFormDTO = z.infer<typeof clienteFormSchema>;
