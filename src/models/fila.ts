import { Cliente, mapCliente } from "./cliente";
import { Entidade } from "./entidade";

export interface Fila extends Entidade {
  empresaId: string;
  setor: string | null;
  tempoMedioEspera: string;
  clientes: Cliente[];
}

export function mapFila(data: any): Fila {
  return {
    id: data.id,
    empresaId: data.empresaId,
    setor: data.setor,
    tempoMedioEspera: data.tempoMedioEspera,
    clientes:
      data.clientes?.map((cliente: Cliente) => {
        return mapCliente(cliente);
      }) ?? [],
    dataHoraCriado: new Date(data.dataHoraCriado),
    dataHoraAlterado: new Date(data.dataHoraAlterado),
    dataHoraDeletado: data.dataHoraDeletado
      ? new Date(data.dataHoraDeletado)
      : null,
  };
}
