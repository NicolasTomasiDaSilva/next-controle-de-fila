"use client";
import { Button } from "@/components/ui/button";
import { StatusEnum } from "@/lib/enums/status-enum";
import { Cliente } from "@/features/shared/models/cliente";
import { Check, Phone, RotateCcw, X } from "lucide-react";
import { RemoverClienteDialog } from "./remover-cliente-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BotoesAcoesDireitaProps {
  cliente: Cliente;
  isSubmitting: boolean;
  handleChamarCliente: (cliente: Cliente) => Promise<void>;
  handleVoltarCliente: (cliente: Cliente) => Promise<void>;
  handleAusentarCliente: (cliente: Cliente) => Promise<void>;
}
export default function BotoesAcoesDireita({
  cliente,
  isSubmitting,
  handleChamarCliente,
  handleVoltarCliente,
  handleAusentarCliente,
}: BotoesAcoesDireitaProps) {
  if (cliente.status === StatusEnum.Aguardando) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isSubmitting}
                onClick={async () => handleChamarCliente(cliente)}
                variant="ghost"
                className="!h-auto !p-2 text-green-600 hover:bg-green-100 hover:text-green-600 text-green-600"
              >
                <Phone className="!w-5 !h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Chamar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <RemoverClienteDialog cliente={cliente} />
      </>
    );
  }

  if (cliente.status === StatusEnum.Chamado)
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isSubmitting}
                onClick={async () => handleVoltarCliente(cliente)}
                variant="ghost"
                className="!h-auto !p-2 hover:bg-blue-100 hover:text-blue-600 text-blue-600"
              >
                <RotateCcw className="!w-5 !h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Voltar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isSubmitting}
                onClick={async () => handleAusentarCliente(cliente)}
                variant="ghost"
                className="!h-auto !p-2 hover:bg-orange-100 hover:text-orange-600 text-orange-600"
              >
                <X className="!w-5 !h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Não comparecer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
}
