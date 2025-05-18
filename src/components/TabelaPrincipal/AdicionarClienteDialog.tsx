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
import { useFila } from "@/hooks/use-fila";

import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { ClienteForm } from "./ClienteForm";
import { cn } from "@/lib/utils";

export function AdicionarClienteDialog() {
  const [open, setOpen] = useState(false);
  const { handleAdicionar, fila } = useFila();

  async function handleAdicionarCliente(clienteForm: ClienteFormDTO) {
    const dadosNovoClienteFormatados: AdicionarClienteDTO = {
      ...clienteForm,
      filaId: fila.id,
    };

    await handleAdicionar(dadosNovoClienteFormatados);
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-40 block ml-auto">
          + Adicionar à fila
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
        </DialogHeader>
        <ClienteForm
          onSubmit={handleAdicionarCliente}
          textoBotao="Adicionar"
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
