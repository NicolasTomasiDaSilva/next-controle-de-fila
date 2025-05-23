import { configuracaoSchema } from "@/models/configuracao";
import z from "zod";

export const configuracaoFormSchema = configuracaoSchema.pick({
  logoUrl: true,
  nomeDisplay: true,
  enderecoDisplay: true,
  corPrimaria: true,
  corSobreposicao: true,
});

export type configuracaoFormDTO = z.infer<typeof configuracaoFormSchema>;
