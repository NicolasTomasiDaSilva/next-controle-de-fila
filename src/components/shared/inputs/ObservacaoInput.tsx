import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ObservacaoInputProps {
  observacao: string | null;
  setObservacao: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ObservacaoInput({
  observacao,
  setObservacao,
}: ObservacaoInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="observacao">Observação</Label>
      <Input
        type="text"
        id="observacao"
        value={observacao ?? ""}
        onChange={(e) => setObservacao(e.target.value)}
        placeholder="Digite uma observação"
      />
    </div>
  );
}
