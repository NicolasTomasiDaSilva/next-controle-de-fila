import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TelefoneInputProps {
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

export default function NomeInput({
  nome,
  setNome,
  error,
}: TelefoneInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="nome">Nome</Label>
      <Input
        id="nome"
        value={nome}
        type="text"
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite o nome do cliente"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
