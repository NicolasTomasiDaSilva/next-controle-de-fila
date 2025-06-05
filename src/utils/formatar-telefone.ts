import IMask from "imask";

export function formatarTelefone(value: string) {
  const numero = value.replace(/\D/g, "");
  const mask = numero.length > 10 ? "(00) 00000-0000" : "(00) 0000-0000";

  const masked = IMask.createMask({ mask });
  masked.resolve(value);

  return masked.value;
}
