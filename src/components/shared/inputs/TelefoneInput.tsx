import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IMaskInput } from "react-imask";

interface TelefoneInputProps {
  telefone: string | null;
  setTelefone: React.Dispatch<React.SetStateAction<string | null>>;
  error?: string;
}

export default function TelefoneInput({
  telefone,
  setTelefone,
  error,
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
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
        type="tel"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
