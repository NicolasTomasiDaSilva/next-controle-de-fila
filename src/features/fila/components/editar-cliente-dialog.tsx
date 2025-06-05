"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Edit, Save } from "lucide-react";
import { Cliente } from "@/models/cliente";
import { ClienteFormDTO } from "@/dtos/cliente";
import { ClienteForm } from "./cliente-form";
import useEditarCliente from "@/features/fila/hooks/use-editar-cliente";

interface EditarClienteDialogProps {
  cliente: Cliente;
}

export function EditarClienteDialog({ cliente }: EditarClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleEditarCliente } = useEditarCliente();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdtiarCliente(clienteForm: ClienteFormDTO) {
    setIsSubmitting(true);
    const clienteAtualizado: Cliente = {
      ...cliente,
      ...clienteForm,
    };
    await handleEditarCliente(clienteAtualizado);
    setOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="!h-auto !p-2">
          <Edit className="!w-5 !h-5 text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm
          botao={() => (
            <Button
              variant={"azul"}
              className="w-full sm:w-40 block ml-auto"
              type="submit"
              disabled={isSubmitting}
            >
              <Save className="inline mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          )}
          cliente={cliente}
          onSubmit={handleEdtiarCliente}
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
