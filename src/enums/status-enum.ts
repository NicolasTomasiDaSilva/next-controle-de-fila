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
  [StatusEnum.Aguardando]: { label: "Aguardando", className: "bg-yellow-200" },
  [StatusEnum.Chamado]: { label: "Chamado", className: "bg-blue-200" },
  [StatusEnum.Atendido]: { label: "Atendido", className: "bg-green-200" },
  [StatusEnum.Desistente]: { label: "Desistente", className: "bg-red-200" },
  [StatusEnum.Removido]: { label: "Removido", className: "bg-gray-200" },
  [StatusEnum.Ausente]: { label: "Não Compareceu", className: "bg-orange-200" },
};
