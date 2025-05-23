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
import { EditarClienteDialog } from "./TabelaPrincipal/EditarClienteDialog";
import { TempoDecorrido } from "../../shared/TempoDecorrido";
import { BotoesAcoesCliente } from "./BotoesAcoesCliente";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
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
          <BotoesAcoesCliente cliente={cliente}></BotoesAcoesCliente>
        </div>
      </div>
    </td>
  );
}
