import { Cliente } from "./cliente";
import { Entidade } from "./entidade";

export interface Fila extends Entidade {
  empresaId: string;
  setor: string | null;
  tempoMedioEspera: string;
  clientes: Cliente[];
}
