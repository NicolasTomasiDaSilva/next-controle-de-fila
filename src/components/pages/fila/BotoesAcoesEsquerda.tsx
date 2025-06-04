import { Button } from "@/components/ui/button";
import { useFila } from "@/hooks/fila/use-fila";
import { Cliente } from "@/models/cliente";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { EditarClienteDialog } from "./TabelaPrincipal/EditarClienteDialog";
import { StatusEnum } from "@/enums/status-enum";

interface BotoesAcoesEsquerdaProps {
  cliente: Cliente;
}
export default function BotoesAcoesEsquerda({
  cliente,
}: BotoesAcoesEsquerdaProps) {
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
  if (cliente.status === StatusEnum.Aguardando) {
    return (
      <>
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
      </>
    );
  }
}
