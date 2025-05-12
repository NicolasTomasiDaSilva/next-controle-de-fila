import { Entidade } from "./entidade";

export interface Configuracao extends Entidade {
  empresaId: string;
  nomeDisplay: string;
  whatsappAtivo: boolean;
  enderecoDisplay: string | null;
  mensagemEntrada: string | null;
  mensagemChamada: string | null;
  mensagemRemovido: string | null;
  logoUrl: string | null;
  corPrimaria: string | null;
  corSobreposicao: string | null;
  corTexto: string | null;
}
