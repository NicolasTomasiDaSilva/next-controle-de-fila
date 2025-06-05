"use client";

import { Cliente, clienteSchema } from "@/models/cliente";

import { Clock } from "lucide-react";
import { StatusEnum, StatusMap } from "@/enums/status-enum";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import BotoesAcoesEsquerda from "./BotoesAcoesEsquerda";
import BotoesAcoesDireita from "./BotoesAcoesDireita";
import { useAcoesCliente } from "@/hooks/fila/use-acoes-cliente";
import { TelefoneFormatado } from "@/components/shared/telefone-formatado";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
  const {
    isSubmitting,
    handleChamarCliente,
    handleRemoverCliente,
    handleAusentarCliente,
    handleMoverCimaCliente,
    handleMoverBaixoCliente,
    handleAtenderCliente,
    handleVoltarCliente,
  } = useAcoesCliente();

  return (
    <div className="w-full px-4  py-6 flex flex-col md:justify-between md:flex-row md:items-center md:pr-15 md:pl-0 ">
      <div className="hidden md:flex w-15 shrink-0 items-center justify-center">
        <span className="text-xl font-bold text-blue-600">
          {cliente.posicao}
        </span>
      </div>
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center">
            {cliente.status === StatusEnum.Aguardando && (
              <span className="text-xl font-bold text-blue-600 mr-4 md:hidden">
                {cliente.posicao}
              </span>
            )}
            <span className="font-semibold">{cliente.nome}</span>
          </div>
          <p className="text-sm text-muted-foreground ">
            {cliente.telefone && (
              <TelefoneFormatado
                value={cliente.telefone || ""}
              ></TelefoneFormatado>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{cliente.observacao}</p>
        </div>
        <div className="flex flex-col items-center gap-5 justify-center md:flex-row">
          <p className="text-sm text-muted-foreground flex flex-row gap-1 items-center">
            <Clock className="w-3 h-3" />
            23min
          </p>
          {cliente.status !== StatusEnum.Aguardando && (
            <div className="w-27 flex flex-row items-center justify-center">
              <Badge
                variant="secondary"
                className={cn(StatusMap[cliente.status].className)}
              >
                {StatusMap[cliente.status].label}
              </Badge>
            </div>
          )}
        </div>
      </div>
      {(cliente.status === StatusEnum.Aguardando ||
        cliente.status === StatusEnum.Chamado) && (
        <div className=" flex flex-row  items-center justify-between">
          <div className="flex flex-row items-center">
            {cliente.status === StatusEnum.Aguardando && (
              <BotoesAcoesEsquerda
                handleMoverCimaCliente={handleMoverCimaCliente}
                handleMoverBaixoCliente={handleMoverBaixoCliente}
                cliente={cliente}
                isSubmitting={isSubmitting}
              ></BotoesAcoesEsquerda>
            )}
          </div>
          <div className="flex flex-row items-center">
            <BotoesAcoesDireita
              handleChamarCliente={handleChamarCliente}
              handleRemoverCliente={handleRemoverCliente}
              handleAusentarCliente={handleAusentarCliente}
              handleAtenderCliente={handleAtenderCliente}
              handleVoltarCliente={handleVoltarCliente}
              isSubmitting={isSubmitting}
              cliente={cliente}
            ></BotoesAcoesDireita>
          </div>
        </div>
      )}
    </div>
  );
}
