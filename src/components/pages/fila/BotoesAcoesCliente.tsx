"use client";

import { StatusEnum } from "@/enums/status-enum";
import { useFila } from "@/hooks/use-fila";
import { Cliente } from "@/models/cliente";
import {
  CheckCircle,
  CircleArrowDown,
  CircleArrowLeft,
  CircleArrowUp,
  Phone,
  Trash,
  XCircle,
} from "lucide-react";
import { RemoverClienteDialog } from "./TabelaPrincipal/RemoverClienteDialog";

interface BotoesAcoesClienteProps {
  cliente: Cliente;
}

export function BotoesAcoesCliente({ cliente }: BotoesAcoesClienteProps) {
  const {
    isSubmitting,
    handleChamar,
    handleRemover,
    handleMoverCima,
    handleMoverBaixo,
    handleVoltar,
    handleAtender,
    handleAusentar,
  } = useFila();

  return (
    <>
      {cliente.status === StatusEnum.Aguardando && (
        <div className=" min-w-max w-[max-content] grid grid-cols-2 md:grid-cols-4 gap-2 ">
          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleMoverCima(cliente);
            }}
            className="text-black-500 hover:text-black-700 transition md:order-2 cursor-pointer"
          >
            <CircleArrowUp className="w-7 h-7" />
          </button>
          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleMoverBaixo(cliente);
            }}
            className="text-black-500 hover:text-black-700 transition md:order-3 cursor-pointer"
          >
            <CircleArrowDown className="w-7 h-7" />
          </button>
          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleChamar(cliente);
            }}
            className="text-green-500 hover:text-green-700 transition md:order-1 cursor-pointer"
          >
            <Phone className="w-7 h-7" />
          </button>
          <RemoverClienteDialog cliente={cliente} />
        </div>
      )}
      {cliente.status === StatusEnum.Chamado && (
        <div className=" min-w-max w-[max-content] grid grid-cols-3 gap-2 ">
          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleAtender(cliente);
            }}
            className="text-green-500 hover:text-green-700 transition md:order-1 cursor-pointer"
          >
            <CheckCircle className="w-7 h-7" />
          </button>

          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleVoltar(cliente);
            }}
            className="text-blue-500 hover:text-blue-700 transition md:order-4 cursor-pointer"
          >
            <CircleArrowLeft className="w-7 h-7" />
          </button>
          <button
            disabled={isSubmitting}
            onClick={async () => {
              handleAusentar(cliente);
            }}
            className="text-red-500 hover:text-red-700 transition md:order-1 cursor-pointer"
          >
            <XCircle className="w-7 h-7" />
          </button>
        </div>
      )}
    </>
  );
}
