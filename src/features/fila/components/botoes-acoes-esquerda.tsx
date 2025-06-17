import { Button } from "@/components/ui/button";

import { Cliente } from "@/features/shared/models/cliente";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EditarClienteDialog } from "./editar-cliente-dialog";
import { StatusEnum, StatusMap } from "@/enums/status-enum";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BotoesAcoesEsquerdaProps {
  cliente: Cliente;
  isSubmitting: boolean;
  handleMoverCimaCliente: (cliente: Cliente) => Promise<void>;
  handleMoverBaixoCliente: (cliente: Cliente) => Promise<void>;
}
export default function BotoesAcoesEsquerda({
  cliente,
  handleMoverCimaCliente,
  handleMoverBaixoCliente,
  isSubmitting,
}: BotoesAcoesEsquerdaProps) {
  if (cliente.status !== StatusEnum.Aguardando) {
    return (
      <div className=" flex flex-row items-center justify-center">
        <Badge
          variant="secondary"
          className={cn(StatusMap[cliente.status].className)}
        >
          {StatusMap[cliente.status].label}
        </Badge>
      </div>
    );
  }

  if (cliente.status === StatusEnum.Aguardando) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isSubmitting}
                onClick={async () => handleMoverCimaCliente(cliente)}
                variant="ghost"
                className="!h-auto !p-2"
              >
                <ChevronUp className="!w-5 !h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Mover Cima</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isSubmitting}
                onClick={async () => handleMoverBaixoCliente(cliente)}
                variant="ghost"
                className="!h-auto !p-2"
              >
                <ChevronDown className="!w-5 !h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Mover Baixo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <EditarClienteDialog cliente={cliente} />
      </>
    );
  }
}
