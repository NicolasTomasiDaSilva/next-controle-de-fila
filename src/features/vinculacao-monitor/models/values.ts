import z from "zod";

export const codigoVinculacaoSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{4}$/, { message: "Código inválido" });
