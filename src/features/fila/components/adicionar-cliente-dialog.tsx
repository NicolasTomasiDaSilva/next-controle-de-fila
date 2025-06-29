"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import useAdicionarCliente from "@/features/fila/hooks/use-adicionar-cliente";
import { ClienteForm } from "./cliente-form";
import { useFila } from "../hooks/use-fila";
import { ClienteFormDTO } from "../models/cliente-form-dto";

export function AdicionarClienteDialog() {
  const [open, setOpen] = useState(false);
  const { isSubmitting, setIsSubmitting } = useFila();
  const { handleAdicionarCliente } = useAdicionarCliente();

  async function handleAdicionar(clienteForm: ClienteFormDTO) {
    setIsSubmitting(true);
    await handleAdicionarCliente(clienteForm);
    setOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="azul" className="w-full sm:w-40 block ml-auto">
            <Plus className="mr-2 inline"></Plus>
            Adicionar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Cliente à Fila</DialogTitle>
          </DialogHeader>
          <ClienteForm
            botao={() => (
              <Button
                variant={"azul"}
                className="w-full sm:w-40 block ml-auto"
                type="submit"
                disabled={isSubmitting}
              >
                <Plus className="inline mr-2" />
                {isSubmitting ? "Adicionando..." : "Adicionar"}
              </Button>
            )}
            onSubmit={handleAdicionar}
          ></ClienteForm>
        </DialogContent>
      </Dialog>
      <Button
        variant="azul"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </>
  );
}
