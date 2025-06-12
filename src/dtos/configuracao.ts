import { configuracaoSchema } from "@/features/shared/models/configuracao";
import z from "zod";

export const configuracaoFormSchema = configuracaoSchema.pick({
  logoUrl: true,
  nomeDisplay: true,
  enderecoDisplay: true,
  corPrimaria: true,
  corSobreposicao: true,
});

export type ConfiguracaoFormDTO = z.infer<typeof configuracaoFormSchema>;

export const mensagensFormSchema = configuracaoSchema.pick({
  mensagemEntrada: true,
  mensagemChamada: true,
  mensagemRemovido: true,
});

export type MensagensFormDTO = z.infer<typeof mensagensFormSchema>;
