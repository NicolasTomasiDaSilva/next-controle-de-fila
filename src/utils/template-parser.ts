import { Editor } from "@tiptap/react";

export function getTemplateTextFromEditor(editor: Editor): string {
  let output = "";

  editor.state.doc.descendants((node) => {
    if (node.type.name === "token") {
      output += `{${node.attrs.label}}`;
    } else if (node.isText) {
      output += node.text;
    } else if (node.type.name === "hardBreak") {
      output += "\n";
    } else if (node.type.name === "paragraph") {
      output += "\n\n";
    }
  });

  return output.trim();
}

export function templateTextToHTML(template: string): string {
  // Escapa HTML básico para evitar XSS
  const escapeHtml = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Converte tokens {nome} para spans do tiptap
  const html = escapeHtml(template).replace(/\{(\w+)\}/g, (_, token) => {
    return `<span data-token="true" label="${token}" class="bg-red-200 px-1 rounded">{${token}}</span>`;
  });

  // converte quebras de linha para HTML válido
  return `<p>${html.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
}
