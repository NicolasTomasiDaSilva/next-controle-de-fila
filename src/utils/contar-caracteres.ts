export function contarCaracteresSemPlaceholders(texto: string): number {
  const semPlaceholders = texto.replace(/{{[^}]+}}/g, "");
  return semPlaceholders.length;
}

export function hasToken(html: string, token: string): boolean {
  return html.includes(`{{${token}}}`);
}
