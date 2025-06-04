"use client";

import { Cliente, clienteSchema } from "@/models/cliente";

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
  ChevronDown,
  ChevronUp,
  Edit,
  BadgeCheckIcon,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { StatusEnum, StatusMap } from "@/enums/status-enum";
import { useFila } from "@/hooks/use-fila";
import { EditarClienteDialog } from "./TabelaPrincipal/EditarClienteDialog";
import { TempoDecorrido } from "../../shared/TempoDecorrido";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RemoverClienteDialog } from "./TabelaPrincipal/RemoverClienteDialog";
import BotoesAcoesEsquerda from "./BotoesAcoesEsquerda";
import BotoesAcoesDireita from "./BotoesAcoesDireita";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
  const {
    isSubmitting,
    fila,
    setFila,
    handleAdicionar,
    handleAtualizar,
    handleChamar,
    handleRemover,
    handleAusentar,
    handleMoverCima,
    handleMoverBaixo,
    handleAtender,
    handleVoltar,
  } = useFila();

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
          <p className="text-sm text-muted-foreground">{cliente.telefone}</p>
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
              <BotoesAcoesEsquerda cliente={cliente}></BotoesAcoesEsquerda>
            )}
          </div>
          <div className="flex flex-row items-center">
            <BotoesAcoesDireita cliente={cliente}></BotoesAcoesDireita>
          </div>
        </div>
      )}
    </div>
  );
}
