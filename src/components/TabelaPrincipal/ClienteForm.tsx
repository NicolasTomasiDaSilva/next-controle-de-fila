import { Dispatch, SetStateAction, useState } from "react";
import NomeInput from "../shared/inputs/NomeInput";
import ObservacaoInput from "../shared/inputs/ObservacaoInput";
import TelefoneInput from "../shared/inputs/TelefoneInput";
import { Button } from "../ui/button";
import { Cliente, clienteSchema } from "@/models/cliente";
import {
  AdicionarClienteDTO,
  ClienteFormDTO,
  clienteFormDtoSchema,
} from "@/dtos/cliente";

interface ClienteFormProps {
  buttonTittle: string;
  onSubmit: (clienteForm: ClienteFormDTO) => Promise<void>;
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  observacao: string | null;
  setObservacao: Dispatch<SetStateAction<string | null>>;
  telefone: string | null;
  setTelefone: Dispatch<SetStateAction<string | null>>;
}

export default function ClienteForm({
  buttonTittle,
  onSubmit,
  nome,
  setNome,
  observacao,
  setObservacao,
  telefone,
  setTelefone,
}: ClienteFormProps) {
  const [errors, setErrors] = useState<{
    nome?: string;
    observacao?: string;
    telefone?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dadosSubmetidos = {
      nome,
      observacao,
      telefone,
    };

    const result = clienteFormDtoSchema.safeParse(dadosSubmetidos);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        nome: fieldErrors.nome?.[0],
        telefone: fieldErrors.telefone?.[0],
        observacao: fieldErrors.observacao?.[0],
      });
      return;
    }

    setErrors({});
    onSubmit(result.data);
    setNome("");
    setObservacao("");
    setTelefone("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <NomeInput nome={nome} setNome={setNome} error={errors.nome}></NomeInput>
      <ObservacaoInput
        observacao={observacao}
        setObservacao={setObservacao}
        error={errors.observacao}
      ></ObservacaoInput>
      <TelefoneInput
        telefone={telefone}
        setTelefone={setTelefone}
        error={errors.telefone}
      ></TelefoneInput>
      <div className="flex flex-col sm:flex-row">
        <Button
          type="submit"
          className="w-full sm:w-30 sm:ml-auto bg-blue-400 hover:bg-blue-700 cursor-pointer"
        >
          {buttonTittle}
        </Button>
      </div>
    </form>
  );
}
