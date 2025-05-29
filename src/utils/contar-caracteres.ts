export function contarCaracteresSemPlaceholders(texto: string): number {
  const semPlaceholders = texto.replace(/{{[^}]+}}/g, "");
  return semPlaceholders.length;
}

export function hasToken(html: string, token: string): boolean {
  return html.includes(`{{${token}}}`);
}

export function removerTokensHtmlDuplicados(html: string): string {
  const tokens = ["nome", "link"];

  tokens.forEach((token) => {
    // Regex que captura todas as tags <span data-token="token">...</span>
    const regex = new RegExp(
      `<span[^>]+data-token="${token}"[^>]*>.*?<\\/span>`,
      "g"
    );

    const matches = html.match(regex);

    if (matches && matches.length > 1) {
      // Mantém só a primeira ocorrência, remove as demais
      const primeira = matches[0];
      // Remove todas as ocorrências
      html = html.replace(regex, "");
      // Insere a primeira de volta no começo do conteúdo
      html = primeira + html;
    }
  });

  return html;
}
