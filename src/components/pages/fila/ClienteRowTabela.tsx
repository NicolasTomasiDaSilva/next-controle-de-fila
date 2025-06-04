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
    <div className="w-full px-6 md:px-15 py-6 flex flex-col md:justify-between gap-2">
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="">
          <div className="flex flex-row items-center gap-2">
            {cliente.status === StatusEnum.Aguardando && (
              <span className="text-xl font-bold text-blue-600 ">
                {cliente.posicao}
              </span>
            )}
            <span className="font-semibold">{cliente.nome}</span>
          </div>
          <p className="text-sm text-muted-foreground">{cliente.telefone}</p>
          {cliente.status === StatusEnum.Aguardando && (
            <p className="text-sm text-muted-foreground">
              {cliente.observacao}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end md:items-center justify-center md:flex-row gap-2  md:justify-between ">
          <p className="text-sm text-muted-foreground flex flex-row gap-1 items-center">
            <Clock className="w-3 h-3" />
            23min
          </p>
          {cliente.status !== StatusEnum.Aguardando && (
            <div className="md:w-24 md:mx-4 md:flex md:flex-row md:justify-center ">
              <Badge
                variant="secondary"
                className={cn(StatusMap[cliente.status].className, "")}
              >
                {StatusMap[cliente.status].label}
              </Badge>
            </div>
          )}
        </div>
      </div>
      {cliente.status === StatusEnum.Aguardando && (
        <div className="flex flex-row justify-between md:gap-2 ">
          <div className="flex flex-row items-center md:gap-2">
            <Button
              disabled={isSubmitting}
              onClick={async () => handleMoverCima(cliente)}
              variant="ghost"
              className="!h-auto !p-2"
            >
              <ChevronUp className="!w-5 !h-5" />
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={async () => handleMoverBaixo(cliente)}
              variant="ghost"
              className="!h-auto !p-2"
            >
              <ChevronDown className="!w-5 !h-5" />
            </Button>
            <EditarClienteDialog cliente={cliente} />
          </div>
          <div className="flex flex-row items-center md:gap-2">
            <Button
              disabled={isSubmitting}
              onClick={async () => handleChamar(cliente)}
              variant="ghost"
              className="!h-auto !p-2 text-green-600 hover:bg-green-100 hover:text-green-600 text-green-600"
            >
              <Phone className="!w-5 !h-5" />
            </Button>
            <RemoverClienteDialog cliente={cliente} />
          </div>
        </div>
      )}

      {cliente.status === StatusEnum.Chamado && (
        <div className="flex flex-row justify-between md:justify-end md:gap-2 ">
          <div className="flex flex-row items-center md:gap-2"></div>
          <div className="flex flex-row items-center md:gap-2">
            <Button
              disabled={isSubmitting}
              onClick={async () => handleAtender(cliente)}
              variant="ghost"
              className="!h-auto !p-2 text-green-600 hover:bg-green-100 hover:text-green-600 text-green-600"
            >
              <Check className="!w-5 !h-5" />
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={async () => handleVoltar(cliente)}
              variant="ghost"
              className="!h-auto !p-2 hover:bg-blue-100 hover:text-blue-600 text-blue-600"
            >
              <RotateCcw className="!w-5 !h-5" />
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={async () => handleAusentar(cliente)}
              variant="ghost"
              className="!h-auto !p-2 hover:bg-orange-100 hover:text-orange-600 text-orange-600"
            >
              <X className="!w-5 !h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
