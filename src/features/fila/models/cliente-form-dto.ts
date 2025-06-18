import { clienteSchema } from "@/features/shared/models/cliente";
import z from "zod";

export const clienteFormSchema = clienteSchema.pick({
  nome: true,
  telefone: true,
  observacao: true,
});

export type ClienteFormDTO = z.infer<typeof clienteFormSchema>;
