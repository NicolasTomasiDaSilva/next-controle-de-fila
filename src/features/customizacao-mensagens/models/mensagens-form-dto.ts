import { configuracaoSchema } from "@/features/shared/models/configuracao";
import z from "zod";

export const mensagensFormSchema = configuracaoSchema.pick({
  mensagemEntrada: true,
  mensagemChamada: true,
  mensagemRemovido: true,
});

export type MensagensFormDTO = z.infer<typeof mensagensFormSchema>;
