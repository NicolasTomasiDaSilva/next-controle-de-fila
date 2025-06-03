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

  return <></>;
}
