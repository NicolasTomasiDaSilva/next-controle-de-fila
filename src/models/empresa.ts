import { Configuracao } from "./configuracao";
import { Entidade } from "./entidade";

export interface Empresa extends Entidade {
  nome: string;
  cpfCnpj: string;
  email: string;
  configuracao: Configuracao;
}
