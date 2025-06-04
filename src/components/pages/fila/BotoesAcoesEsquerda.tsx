import { Button } from "@/components/ui/button";

import { Cliente } from "@/models/cliente";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { EditarClienteDialog } from "./TabelaPrincipal/EditarClienteDialog";
import { StatusEnum } from "@/enums/status-enum";
import { useFila } from "@/hooks/fila/use-fila";

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
  if (cliente.status === StatusEnum.Aguardando) {
    return (
      <>
        <Button
          disabled={isSubmitting}
          onClick={async () => handleMoverCimaCliente(cliente)}
          variant="ghost"
          className="!h-auto !p-2"
        >
          <ChevronUp className="!w-5 !h-5" />
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={async () => handleMoverBaixoCliente(cliente)}
          variant="ghost"
          className="!h-auto !p-2"
        >
          <ChevronDown className="!w-5 !h-5" />
        </Button>
        <EditarClienteDialog cliente={cliente} />
      </>
    );
  }
}
