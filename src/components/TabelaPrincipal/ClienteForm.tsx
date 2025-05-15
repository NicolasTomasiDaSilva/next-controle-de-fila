import { Dispatch, SetStateAction } from "react";
import NomeInput from "../shared/inputs/NomeInput";
import ObservacaoInput from "../shared/inputs/ObservacaoInput";
import TelefoneInput from "../shared/inputs/TelefoneInput";
import { Button } from "../ui/button";

interface ClienteFormProps {
  buttonTittle: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  observacao: string | null;
  setObservacao: Dispatch<SetStateAction<string>>;
  telefone: string | null;
  setTelefone: Dispatch<SetStateAction<string>>;
}

export default function ClienteForm({
  buttonTittle,
  handleSubmit,
  nome,
  setNome,
  observacao,
  setObservacao,
  telefone,
  setTelefone,
}: ClienteFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <NomeInput nome={nome} setNome={setNome}></NomeInput>
      <ObservacaoInput
        observacao={observacao}
        setObservacao={setObservacao}
      ></ObservacaoInput>
      <TelefoneInput
        telefone={telefone}
        setTelefone={setTelefone}
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
