import { toWhatsAppMarkdown } from "@/utils/token-transform";
import { Entidade, entidadeSchema } from "./entidade";
import { z } from "zod";
import { texto } from "./values";
import { text } from "stream/consumers";

export const configuracaoSchema = entidadeSchema.extend({
  empresaId: z.string().uuid(),
  nomeDisplay: texto({ campo: "Nome Fantasia", min: 1, max: 50 }),
  whatsappAtivo: z.boolean(),
  enderecoDisplay: texto({
    campo: "Endereço",
    min: 1,
    max: 50,
    transformarEmNull: true,
  }),
  mensagemEntrada: texto({
    campo: "Mensagem de Entrada",
    min: 1,
    max: 500,
    transformarEmNull: true,
  }),
  mensagemChamada: texto({
    campo: "Mensagem de Chamada",
    min: 1,
    max: 500,
    transformarEmNull: true,
  }),
  mensagemRemovido: texto({
    campo: "Mensagem de Removido",
    min: 1,
    max: 500,
    transformarEmNull: true,
  }),
  corPrimaria: texto({ campo: "Cor Primária", min: 4, max: 9 }),
  corSobreposicao: texto({ campo: "Cor Sobreposição", min: 4, max: 9 }),
});

export type Configuracao = z.infer<typeof configuracaoSchema>;
