import { clienteSchema } from "@/models/cliente";
import { z } from "zod";

export const adicionarClienteDTOSchema = clienteSchema.pick({
  filaId: true,
  nome: true,
  telefone: true,
  observacao: true,
});

export type AdicionarClienteDTO = z.infer<typeof adicionarClienteDTOSchema>;

export const clienteFormDtoSchema = clienteSchema.pick({
  nome: true,
  telefone: true,
  observacao: true,
});

export type ClienteFormDTO = z.infer<typeof clienteFormDtoSchema>;
