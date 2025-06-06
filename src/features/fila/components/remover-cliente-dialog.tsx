"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";
import { Cliente } from "@/features/fila/models/cliente";
import useRemoverCliente from "@/features/fila/hooks/use-remover-cliente";
import { useFila } from "../hooks/use-fila";

interface RemoverClienteDialogProps {
  cliente: Cliente;
}

export function RemoverClienteDialog({ cliente }: RemoverClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const { isSubmitting, setIsSubmitting } = useFila();
  const { handleRemoverCliente } = useRemoverCliente();

  async function handleConfirmar() {
    setIsSubmitting(true);
    await handleRemoverCliente(cliente);
    setOpen(false);
    setIsSubmitting(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={isSubmitting}
          variant="ghost"
          className="!h-auto !p-2 hover:bg-red-100 hover:text-red-600 text-red-600"
        >
          <Trash className="!w-5 !h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Cliente</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tem certeza que deseja remover este cliente da fila?
        </DialogDescription>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmar}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Removendo..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
