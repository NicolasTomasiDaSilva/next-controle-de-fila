import { IMaskInput } from "react-imask";

type TelefoneFormatadoProps = {
  value: string;
};

export function TelefoneFormatado({ value }: TelefoneFormatadoProps) {
  return (
    <IMaskInput
      mask={[
        {
          mask: "(00) 0000-0000",
          lazy: false,
        },
        {
          mask: "(00) 00000-0000",
          lazy: false,
        },
      ]}
      value={value}
      readOnly
      className="focus:outline-none"
      unmask={false} // mantém a máscara no valor exibido
      style={{ border: "none", background: "transparent" }}
    />
  );
}
