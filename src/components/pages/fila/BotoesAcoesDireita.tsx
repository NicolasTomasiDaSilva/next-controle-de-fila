"use client";
import { Button } from "@/components/ui/button";
import { StatusEnum } from "@/enums/status-enum";
import { useFila } from "@/hooks/fila/use-fila";
import { Cliente } from "@/models/cliente";
import { Check, Phone, RotateCcw, X } from "lucide-react";
import { RemoverClienteDialog } from "./TabelaPrincipal/RemoverClienteDialog";

interface BotoesAcoesDireitaProps {
  cliente: Cliente;
}
export default function BotoesAcoesDireita({
  cliente,
}: BotoesAcoesDireitaProps) {
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
          onClick={async () => handleChamar(cliente)}
          variant="ghost"
          className="!h-auto !p-2 text-green-600 hover:bg-green-100 hover:text-green-600 text-green-600"
        >
          <Phone className="!w-5 !h-5" />
        </Button>
        <RemoverClienteDialog
          cliente={cliente}
          handleRemover={handleRemover}
          isSubmitting={isSubmitting}
        />
      </>
    );
  }

  if (cliente.status === StatusEnum.Chamado)
    return (
      <>
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
      </>
    );
}
