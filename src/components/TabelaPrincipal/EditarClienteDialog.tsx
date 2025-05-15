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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TelefoneInput from "../shared/inputs/TelefoneInput";
import NomeInput from "../shared/inputs/NomeInput";
import ObservacaoInput from "../shared/inputs/ObservacaoInput";
import { useFila } from "@/hooks/use-fila";
import { filaService } from "@/services/fila-service-client";
import { Fila } from "@/models/fila";
import ClienteForm from "./ClienteForm";
import { PencilLine } from "lucide-react";
import { Cliente } from "@/models/cliente";

interface EditarClienteDialogProps {
  cliente: Cliente;
}

export function EditarClienteDialog({ cliente }: EditarClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState<string>(cliente.nome);
  const [observacao, setObservacao] = useState<string | null>(
    cliente.observacao
  );
  const [telefone, setTelefone] = useState<string | null>(cliente.telefone);
  const { fila, setFila } = useFila();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clienteAtualizado: Cliente = {
      ...cliente,
      nome,
      observacao: observacao == "" ? null : observacao,
      telefone: telefone == "" ? null : telefone,
    };

    const filaAtualizada: Fila = await filaService.AtualizarCliente(
      clienteAtualizado
    );

    setFila(filaAtualizada);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-5 text-gray-500 hover:text-blue-600 cursor-pointer ml-auto md:ml-2"
        >
          <PencilLine className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm
          buttonTittle="Salvar"
          handleSubmit={handleSubmit}
          nome={nome}
          setNome={setNome}
          observacao={observacao}
          setObservacao={setObservacao}
          telefone={telefone}
          setTelefone={setTelefone}
        ></ClienteForm>
      </DialogContent>
    </Dialog>
  );
}
