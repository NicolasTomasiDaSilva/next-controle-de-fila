export function htmlToWhatsappTemplate(html: string): string {
  const container = document.createElement("div");
  container.innerHTML = html;

  function walk(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    let content = Array.from(el.childNodes).map(walk).join("");

    switch (tag) {
      case "strong":
        return `*${content}*`;
      case "b":
        return `*${content}*`;
      case "em":
        return `_${content}_`;
      case "i":
        return `_${content}_`;
      case "u":
        return `__${content}__`;
      case "s":
      case "del":
        return `~${content}~`;
      case "span":
        if (el.dataset.type === "nome") return `{{nome}}`;
        if (el.dataset.type === "link") return `{{link}}`;
        return content;
      default:
        return content;
    }
  }

  return walk(container).trim();
}

export function whatsappToHtmlTemplate(template: string): string {
  // Substitui tokens {{nome}} e {{link}} por spans com data-type
  let html = template
    .replace(/{{\s*nome\s*}}/gi, '<span data-type="nome">{{nome}}</span>')
    .replace(/{{\s*link\s*}}/gi, '<span data-type="link">{{link}}</span>');

  // Sublinhado: __texto__
  html = html.replace(/__([^_]+?)__/g, "<u>$1</u>");

  // Negrito: *texto*
  html = html.replace(/\*([^\*]+?)\*/g, "<strong>$1</strong>");

  // Itálico: _texto_
  html = html.replace(/_([^_]+?)_/g, "<em>$1</em>");

  // Tachado: ~texto~
  html = html.replace(/~([^~]+?)~/g, "<s>$1</s>");

  return `<p>${html}</p>`;
}
