"use client";
import { IMaskInput } from "react-imask";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useFila } from "@/hooks/use-fila";

import { PencilLine } from "lucide-react";
import { Cliente, clienteSchema } from "@/models/cliente";
import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { ClienteForm } from "./ClienteForm";

interface EditarClienteDialogProps {
  cliente: Cliente;
}

export function EditarClienteDialog({ cliente }: EditarClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleAtualizar } = useFila();

  async function handleEdtiarCliente(clienteForm: ClienteFormDTO) {
    const clienteAtualizado: Cliente = {
      ...cliente,
      ...clienteForm,
    };

    await handleAtualizar(clienteAtualizado);
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-5 text-gray-500 hover:text-gray-700 cursor-pointer ml-auto md:ml-2"
        >
          <PencilLine className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm
          textoBotao="Salvar"
          cliente={cliente}
          onSubmit={handleEdtiarCliente}
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
