export function htmlFromTokens(text: string): string {
  return text
    .replace(/{{nome}}/g, '<span data-token="nome">{{nome}}</span>')
    .replace(/{{link}}/g, '<span data-token="link">{{link}}</span>');
}

export function tokensFromHtml(html: string): string {
  return html
    .replace(/<span[^>]+data-token="nome"[^>]*>.*?<\/span>/g, "{{nome}}")
    .replace(/<span[^>]+data-token="link"[^>]*>.*?<\/span>/g, "{{link}}");
}
