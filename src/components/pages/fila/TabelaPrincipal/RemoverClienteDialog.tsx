"use client";
import { IMaskInput } from "react-imask";

import { useEffect, useState } from "react";
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

import { useFila } from "@/hooks/use-fila";

import { PencilLine, Trash } from "lucide-react";
import { Cliente, clienteSchema } from "@/models/cliente";
import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { ClienteForm } from "./ClienteForm";

interface RemoverClienteDialogProps {
  cliente: Cliente;
}

export function RemoverClienteDialog({ cliente }: RemoverClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleRemover, isSubmitting } = useFila();

  async function handleRemoverCliente() {
    await handleRemover(cliente);
    setOpen(false);
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
            onClick={handleRemoverCliente}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Removendo..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
