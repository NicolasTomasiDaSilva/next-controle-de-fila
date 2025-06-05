import IMask from "imask";

type TelefoneFormatadoProps = {
  value: string;
};

export function TelefoneFormatado({ value }: TelefoneFormatadoProps) {
  const numero = value.replace(/\D/g, ""); // remove não dígitos
  const mask = numero.length > 10 ? "(00) 00000-0000" : "(00) 0000-0000";

  const masked = IMask.createMask({ mask });
  masked.resolve(value);

  return <span className="text-sm text-muted-foreground">{masked.value}</span>;
}
