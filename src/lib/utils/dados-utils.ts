export function formatarTelefone(value: string): string {
  const digitos = value.replace(/\D/g, "").slice(0, 11); // remove não-dígitos e limita a 11 dígitos

  if (digitos.length <= 10) {
    return digitos
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digitos
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}
