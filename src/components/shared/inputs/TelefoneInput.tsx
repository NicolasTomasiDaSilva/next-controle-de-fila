import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";

interface TelefoneInputProps {
  telefone: string;
  setTelefone: (valor: string) => void;
}

export default function TelefoneInput({
  telefone,
  setTelefone,
}: TelefoneInputProps) {
  return (
    <>
      <Label htmlFor="telefone">Telefone</Label>
      <IMaskInput
        id="telefone"
        mask="(00) 00000-0000"
        unmask={true}
        value={telefone}
        onAccept={(value: string) => setTelefone(value)}
        placeholder="(xx) xxxxx-xxxx"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   shadow-sm placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                   disabled:cursor-not-allowed disabled:opacity-50"
        type="tel"
      />
    </>
  );
}
