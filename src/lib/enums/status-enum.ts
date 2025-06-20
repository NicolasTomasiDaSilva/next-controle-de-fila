import { Cor, sectionCores } from "../constants/section-cores";

// types/statusEnum.ts
export enum StatusEnum {
  Aguardando = 1,
  Chamado = 2,
  Desistente = 4,
  Removido = 5,
  Ausente = 6,
}

export function pegarCorPorStatus(status: StatusEnum): Cor {
  switch (status) {
    case StatusEnum.Chamado:
      return sectionCores.green;
    case StatusEnum.Desistente:
      return sectionCores.yellow;
    case StatusEnum.Removido:
      return sectionCores.red;
    case StatusEnum.Ausente:
      return sectionCores.orange;
    default:
      throw new Error("Cor status inválida");
  }
}
export function pegarLabelPorStatus(status: StatusEnum): string {
  switch (status) {
    case StatusEnum.Chamado:
      return "Chamado";
    case StatusEnum.Desistente:
      return "Desistente";
    case StatusEnum.Removido:
      return "Removido";
    case StatusEnum.Ausente:
      return "Não Compareceu";
    default:
      throw new Error("Label status inválida");
  }
}
