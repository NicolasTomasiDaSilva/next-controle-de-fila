export interface Entidade {
  id: string;
  dataHoraCriado: Date;
  dataHoraAlterado: Date;
  dataHoraDeletado: Date | null;
}
