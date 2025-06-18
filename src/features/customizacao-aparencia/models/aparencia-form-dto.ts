import { configuracaoSchema } from "@/features/shared/models/configuracao";
import z from "zod";

export const aparenciaFormSchema = configuracaoSchema.pick({
  logoUrl: true,
  nomeDisplay: true,
  enderecoDisplay: true,
  corPrimaria: true,
  corSobreposicao: true,
});

export type AparenciaFormDTO = z.infer<typeof aparenciaFormSchema>;
