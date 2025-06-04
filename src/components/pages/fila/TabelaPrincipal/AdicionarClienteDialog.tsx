"use client";
import { IMaskInput } from "react-imask";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { ClienteForm } from "./ClienteForm";
import { PlusCircle } from "lucide-react";
import useAdicionarCliente from "@/hooks/fila/use-adicionar-cliente";

export function AdicionarClienteDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleAdicionarCliente } = useAdicionarCliente();

  async function handleAdicionar(clienteForm: ClienteFormDTO) {
    setIsSubmitting(true);
    await handleAdicionarCliente(clienteForm);
    setOpen(false);
    setIsSubmitting(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="azul" className="w-full sm:w-40 block ml-auto">
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
        </DialogHeader>
        <ClienteForm
          onSubmit={handleAdicionar}
          textoBotao="Adicionar"
          isSubmitting={isSubmitting}
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
