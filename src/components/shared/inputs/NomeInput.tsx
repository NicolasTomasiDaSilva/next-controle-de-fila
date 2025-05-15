import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TelefoneInputProps {
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
}

export default function NomeInput({ nome, setNome }: TelefoneInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="nome">Nome</Label>
      <Input
        id="nome"
        value={nome}
        type="text"
        onChange={(e) => setNome(e.target.value)}
        required
        placeholder="Digite o nome do cliente"
      />
    </div>
  );
}
