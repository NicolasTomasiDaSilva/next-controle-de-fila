import { StatusEnum } from "../enums/status-enum";
import { Entidade } from "./entidade";

export interface Cliente extends Entidade {
  filaId: string;
  nome: string;
  telefone: string | null;
  observacao: string | null;
  hash: string;
  posicao: number | null;
  status: StatusEnum;
  dataHoraOrdenacao: Date;
  dataHoraChamada: Date | null;
}
