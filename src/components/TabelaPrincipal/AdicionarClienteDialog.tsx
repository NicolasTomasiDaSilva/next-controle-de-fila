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

interface AdicionarClienteDialogProps {
  filaId: string;
}

export function AdicionarClienteDialog({
  filaId,
}: AdicionarClienteDialogProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, observacao, telefone, filaId });

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

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <NomeInput nome={nome} setNome={setNome}></NomeInput>
          </div>

          <div className="space-y-2"></div>
          <ObservacaoInput
            observacao={observacao}
            setObservacao={setObservacao}
          ></ObservacaoInput>
          <div className="space-y-2">
            <TelefoneInput
              telefone={telefone}
              setTelefone={setTelefone}
            ></TelefoneInput>
          </div>
          <div className="flex flex-col sm:flex-row">
            <Button
              type="submit"
              className="w-full sm:w-30 sm:ml-auto bg-blue-400 hover:bg-blue-700 cursor-pointer"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
