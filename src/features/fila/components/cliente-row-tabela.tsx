"use client";

import { Cliente } from "@/features/shared/models/cliente";

import { Clock } from "lucide-react";
import { StatusEnum } from "@/lib/enums/status-enum";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import BotoesAcoesEsquerda from "./botoes-acoes-esquerda";
import BotoesAcoesDireita from "./botoes-acoes-direita";
import { useAcoesCliente } from "@/features/fila/hooks/use-acoes-cliente";

import { formatarTelefone } from "@/lib/utils/dados-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import formatarData from "@/lib/utils/data-hora-utils";
import { useTempoDecorrido } from "@/features/shared/hooks/use-tempo-decorrido";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
  const {
    isSubmitting,
    handleChamarCliente,
    handleAusentarCliente,
    handleMoverCimaCliente,
    handleMoverBaixoCliente,
    handleVoltarCliente,
  } = useAcoesCliente();
  const minutos = useTempoDecorrido(
    cliente.status === StatusEnum.Aguardando
      ? cliente.dataHoraCriado
      : cliente.dataHoraAlterado
  );

  return (
    <div className="w-full min-h-25 px-4  py-6 flex flex-col md:justify-between md:flex-row md:items-center md:pr-15 md:pl-0 gap-4 ">
      <div className="hidden md:flex w-15 shrink-0 items-center justify-center">
        <span className="text-xl font-bold text-blue-600">
          {cliente.posicao}
        </span>
      </div>
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center">
            {cliente.status === StatusEnum.Aguardando && (
              <p className="text-xl font-bold text-blue-600 mr-4 md:hidden">
                {cliente.posicao}
              </p>
            )}
            <p
              className="font-semibold break-normal "
              style={{ overflowWrap: "anywhere" }}
            >
              {cliente.nome}
            </p>
          </div>
          {cliente.telefone && (
            <p className="text-sm text-muted-foreground  ">
              {formatarTelefone(cliente.telefone)}
            </p>
          )}
          <p
            className="text-sm text-muted-foreground"
            style={{ overflowWrap: "anywhere" }}
          >
            {cliente.observacao}
          </p>
        </div>
        <div className="flex flex-col items-center md:gap-5 justify-center md:flex-row">
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm text-muted-foreground flex flex-row  gap-1 items-center">
                <Clock className="w-3 h-3" />
                <span className="whitespace-nowrap">{minutos} min</span>
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {formatarData(
                  cliente.status === StatusEnum.Aguardando
                    ? cliente.dataHoraCriado
                    : cliente.dataHoraAlterado
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div
        className={`flex flex-row items-center justify-between gap-2 
    ${
      cliente.status !== StatusEnum.Aguardando
        ? "md:flex-col md:items-center md:gap-1"
        : ""
    }
  `}
      >
        <div className="flex flex-row items-center">
          <BotoesAcoesEsquerda
            handleMoverCimaCliente={handleMoverCimaCliente}
            handleMoverBaixoCliente={handleMoverBaixoCliente}
            cliente={cliente}
            isSubmitting={isSubmitting}
          ></BotoesAcoesEsquerda>
        </div>
        <div className="flex flex-row items-center">
          <BotoesAcoesDireita
            handleChamarCliente={handleChamarCliente}
            handleAusentarCliente={handleAusentarCliente}
            handleVoltarCliente={handleVoltarCliente}
            isSubmitting={isSubmitting}
            cliente={cliente}
          ></BotoesAcoesDireita>
        </div>
      </div>
    </div>
  );
}
