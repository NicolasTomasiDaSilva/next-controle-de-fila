import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";

interface TelefoneInputProps {
  telefone: string | null;
  setTelefone: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TelefoneInput({
  telefone,
  setTelefone,
}: TelefoneInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="telefone">Telefone</Label>
      <IMaskInput
        id="telefone"
        value={telefone ?? ""}
        unmask={true}
        onAccept={(value: string) => setTelefone(value)}
        placeholder="(xx) xxxxx-xxxx"
        mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
        dispatch={(appended, dynamicMasked) => {
          const number = (dynamicMasked.value + appended).replace(/\D/g, "");
          return number.length > 10
            ? dynamicMasked.compiledMasks[1]
            : dynamicMasked.compiledMasks[0];
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   shadow-sm placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                   disabled:cursor-not-allowed disabled:opacity-50"
        type="tel"
      />
    </div>
  );
}
