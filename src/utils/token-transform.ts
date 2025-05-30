export function toWhatsAppMarkdown(node: any): string {
  if (!node) return "";

  if (node.type === "text") {
    let text = node.text;

    if (node.marks) {
      node.marks.forEach((mark: any) => {
        switch (mark.type) {
          case "bold":
            text = `*${text}*`;
            break;
          case "italic":
            text = `_${text}_`;
            break;
          case "strike":
            text = `~${text}~`;
            break;
          default:
            break;
        }
      });
    }
    return text;
  }

  if (node.content && Array.isArray(node.content)) {
    return node.content.map(toWhatsAppMarkdown).join("");
  }

  return "";
}

export function whatsappToHtml(text: string) {
  if (!text) return "";

  // Substitui combinações de negrito+itálico primeiro
  text = text.replace(/(\*|_)(\*|_)(.*?)\2\1/g, (_, p1, p2, inner) => {
    // Aqui a ordem importa, se for *_texto_*, ou _*texto*_
    return `<strong><em>${inner}</em></strong>`;
  });

  // Depois negrito
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // Depois itálico
  text = text.replace(/_(.*?)_/g, "<em>$1</em>");

  // Riscado ~texto~
  text = text.replace(/~(.*?)~/g, "<s>$1</s>");

  // Para evitar conflito com tags já criadas, se quiser pode usar algo mais sofisticado (ex: parser tokenizado)

  return text;
}
