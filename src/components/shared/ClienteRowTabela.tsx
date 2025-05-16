"use client";

import { Cliente } from "@/models/cliente";

import {
  Phone,
  Trash,
  CircleArrowUp,
  CircleArrowDown,
  PencilLine,
  Clock,
  CheckCircle,
  CircleArrowLeft,
  XCircle,
} from "lucide-react";
import { StatusEnum, StatusMap } from "@/enums/status-enum";
import { useFila } from "@/hooks/use-fila";
import { EditarClienteDialog } from "../TabelaPrincipal/EditarClienteDialog";
import { TempoDecorrido } from "./TempoDecorrido";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
  const {
    handleChamar,
    handleRemover,
    handleAusentar,
    handleMoverCima,
    handleMoverBaixo,
    handleAtender,
    handleVoltar,
  } = useFila();

  return (
    <td>
      <div className="w-full px-5 py-5 grid grid-cols-1 md:grid-cols-2 md:space-between md:gap-2">
        <div className="flex flex-row items-center gap-2 col-span-1">
          {cliente.posicao && (
            <span className="text-lg font-extrabold text-blue-500 mr-2 md:mr-6 ">
              {cliente.posicao}
            </span>
          )}
          <div>
            <p className="text-lg font-bold  whitespace-normal">
              {cliente.nome}
            </p>
            {cliente.telefone && (
              <p className="text-sm text-muted-foreground">
                {cliente.telefone}
              </p>
            )}
          </div>
          {cliente.status == StatusEnum.Aguardando && (
            <EditarClienteDialog cliente={cliente} />
          )}
        </div>
        <div className="col-span-1 flex items-center justify-between gap-2">
          <div className="flex flex-col items-start md:gap-4 md:flex-row md:items-center md:justify-between ">
            {cliente.status != StatusEnum.Aguardando && (
              <div className="md:order-1 col-span-1 text-left">
                <p
                  className={`text-base whitespace-nowrap font-bold ${
                    StatusMap[cliente.status as StatusEnum]?.className
                  }`}
                >
                  {StatusMap[cliente.status as StatusEnum]?.label}
                </p>
              </div>
            )}
            <div>
              {cliente.status === StatusEnum.Aguardando && (
                <p className="whitespace-normal md:col-span-1 ">
                  {cliente.observacao}
                </p>
              )}

              <div className="flex items-center gap-1 md:col-span-1">
                <Clock className="w-3 h-3" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  <TempoDecorrido
                    data={
                      new Date(
                        cliente.status === StatusEnum.Aguardando
                          ? cliente.dataHoraCriado
                          : cliente.dataHoraAlterado
                      )
                    }
                  />
                </span>
              </div>
            </div>
          </div>

          {cliente.status === StatusEnum.Aguardando && (
            <div className=" min-w-max w-[max-content] grid grid-cols-2 md:grid-cols-4 gap-2 ">
              <button
                onClick={async () => {
                  handleMoverCima(cliente);
                }}
                className="text-black-600 hover:text-black-700 transition md:order-2 cursor-pointer"
              >
                <CircleArrowUp className="w-7 h-7" />
              </button>
              <button
                onClick={async () => {
                  handleMoverBaixo(cliente);
                }}
                className="text-black-600 hover:text-black-700 transition md:order-3 cursor-pointer"
              >
                <CircleArrowDown className="w-7 h-7" />
              </button>
              <button
                onClick={async () => {
                  handleChamar(cliente);
                }}
                className="text-green-600 hover:text-green-700 transition md:order-1 cursor-pointer"
              >
                <Phone className="w-7 h-7" />
              </button>
              <button
                onClick={async () => {
                  handleRemover(cliente);
                }}
                className="text-red-600 hover:text-red-700 transition md:order-4 cursor-pointer"
              >
                <Trash className="w-7 h-7" />
              </button>
            </div>
          )}
          {cliente.status === StatusEnum.Chamado && (
            <div className=" min-w-max w-[max-content] grid grid-cols-3 gap-2 ">
              <button
                onClick={async () => {
                  handleAtender(cliente);
                }}
                className="text-green-500 transition md:order-1 cursor-pointer"
              >
                <CheckCircle className="w-7 h-7" />
              </button>

              <button
                onClick={async () => {
                  handleVoltar(cliente);
                }}
                className="text-blue-500  transition md:order-4 cursor-pointer"
              >
                <CircleArrowLeft className="w-7 h-7" />
              </button>
              <button
                onClick={async () => {
                  handleAusentar(cliente);
                }}
                className="text-red-500 transition md:order-1 cursor-pointer"
              >
                <XCircle className="w-7 h-7" />
              </button>
            </div>
          )}
        </div>
      </div>
    </td>
  );
}
