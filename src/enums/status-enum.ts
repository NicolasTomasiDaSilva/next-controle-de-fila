// types/statusEnum.ts
export enum StatusEnum {
  Aguardando = 1,
  Chamado = 2,
  Atendido = 3,
  Desistente = 4,
  Removido = 5,
  Ausente = 6,
}

export const StatusLabel: Record<StatusEnum, string> = {
  [StatusEnum.Aguardando]: "Aguardando",
  [StatusEnum.Chamado]: "Chamado",
  [StatusEnum.Atendido]: "Atendido",
  [StatusEnum.Desistente]: "Desistente",
  [StatusEnum.Removido]: "Removido",
  [StatusEnum.Ausente]: "Não Compareceu",
};

export const StatusMap: Record<
  StatusEnum,
  { label: string; className: string }
> = {
  [StatusEnum.Aguardando]: {
    label: "Aguardando",
    className: "text-blue-600",
  },
  [StatusEnum.Chamado]: { label: "Chamado", className: "text-blue-200" },
  [StatusEnum.Atendido]: { label: "Atendido", className: "text-green-200" },
  [StatusEnum.Desistente]: { label: "Desistente", className: "text-red-200" },
  [StatusEnum.Removido]: { label: "Removido", className: "text-gray-200" },
  [StatusEnum.Ausente]: {
    label: "Não Compareceu",
    className: "text-orange-200",
  },
};
