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

export function AdicionarClienteDialog() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const { fila, setFila } = useFila();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filaAtualizada: Fila = await filaService.AdicionarCliente({
      nome,
      observacao,
      telefone,
      filaId: fila.id,
    });
    setNome("");
    setObservacao("");
    setTelefone("");
    setFila(filaAtualizada);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setNome("");
      setObservacao("");
      setTelefone("");
    }
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
