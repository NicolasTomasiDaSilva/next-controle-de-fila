import { Cliente } from "./cliente";
import { Entidade } from "./entidade";

export interface Fila extends Entidade {
  empresaId: string;
  setor: string | null;
  TempoMedioEspera: string;
  clientes: Cliente[];
}
