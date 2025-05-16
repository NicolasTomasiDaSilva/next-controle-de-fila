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
import { filaService } from "@/services/fila-service-client";
import { Fila } from "@/models/fila";
import ClienteForm from "./ClienteForm";
import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { clienteSchema } from "@/models/cliente";

export function AdicionarClienteDialog() {
  const [open, setOpen] = useState(false);
  const { handleAdicionar, fila } = useFila();

  const handleSubmit = async (clienteForm: ClienteFormDTO) => {
    const dadosNovoClienteFormatados: AdicionarClienteDTO = {
      ...clienteForm,
      filaId: fila.id,
    };

    await handleAdicionar(dadosNovoClienteFormatados);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-white mb-4 border border-gray-400 text-black shadow hover:bg-blue-500 hover:text-white cursor-pointer px-2 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base sm:w-[30%] sm:ml-auto">
          + Adicionar à fila
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
        </DialogHeader>
        <ClienteForm
          buttonTittle="Adicionar"
          onSubmit={handleSubmit}
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
