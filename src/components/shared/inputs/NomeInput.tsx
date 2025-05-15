import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TelefoneInputProps {
  nome: string;
  setNome: (valor: string) => void;
}

export default function NomeInput({ nome, setNome }: TelefoneInputProps) {
  return (
    <>
      <Label htmlFor="nome">Nome</Label>
      <Input
        id="nome"
        value={nome}
        type="text"
        onChange={(e) => setNome(e.target.value)}
        required
        placeholder="Digite o nome do cliente"
      />
    </>
  );
}
