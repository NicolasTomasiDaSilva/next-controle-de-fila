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

export function mapCliente(data: any): Cliente {
  return {
    id: data.id,
    filaId: data.filaId,
    nome: data.nome,
    telefone: data.telefone,
    observacao: data.observacao,
    hash: data.hash,
    posicao: data.posicao,
    status: data.status,
    dataHoraOrdenacao: new Date(data.dataHoraOrdenacao),
    dataHoraChamada: data.dataHoraChamada
      ? new Date(data.dataHoraChamada)
      : null,
    dataHoraCriado: new Date(data.dataHoraCriado),
    dataHoraAlterado: new Date(data.dataHoraAlterado),
    dataHoraDeletado: data.dataHoraDeletado
      ? new Date(data.dataHoraDeletado)
      : null,
  };
}
