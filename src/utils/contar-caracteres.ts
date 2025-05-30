export function contarCaracteresSemPlaceholders(texto: string): number {
  const semPlaceholders = texto.replace(/{{[^}]+}}/g, "");
  return semPlaceholders.length;
}
