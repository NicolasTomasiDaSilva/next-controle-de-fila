import z from "zod";
import { isCNPJ, isCPF } from "brazilian-values";

export const codigoVinculacaoMonitorSchema = z
  .string()
  .nonempty("Código de vinculação é obrigatório")
  .regex(/^[a-zA-Z0-9]{4}$/, { message: "Código inválido" });
