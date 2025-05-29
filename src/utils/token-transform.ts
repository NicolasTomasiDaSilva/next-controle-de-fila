export function htmlFromTokens(text: string): string {
  return text
    .replace(/{{nome}}/g, '<span data-token="nome">{{nome}}</span>')
    .replace(/{{link}}/g, '<span data-token="link">{{link}}</span>');
}

export function tokensFromHtml(html: string): string {
  // Remove tags <p> e outras, mantendo o conteúdo interno e substituindo spans tokens
  let text = html
    .replace(/<span[^>]+data-token="nome"[^>]*>.*?<\/span>/g, "{{nome}}")
    .replace(/<span[^>]+data-token="link"[^>]*>.*?<\/span>/g, "{{link}}");

  // Remove qualquer tag HTML que sobrou (como <p>, <div>, etc)
  text = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Remove espaços extras no começo e fim
  return text.trim();
}
