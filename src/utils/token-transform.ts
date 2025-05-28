import { JSONContent } from "@tiptap/react";

export function tokensFromHtml(content: JSONContent): string {
  let result = "";

  content.content?.forEach((node) => {
    if (node.type === "paragraph") {
      node.content?.forEach((child) => {
        if (child.type === "text") {
          result += child.text;
        } else if (child.type === "token") {
          result += `{${child.attrs?.label}}`;
        }
      });
      result += "\n";
    }
  });

  return result.trim();
}

export function htmlFromTokens(text: string): string {
  // Transforma {token} em <span data-token>...</span>
  const tokenRegex = /\{(.*?)\}/g;
  const html = text.replace(tokenRegex, (_, label) => {
    return `<span data-token="true" class="bg-red-200" data-label="${label}">{${label}}</span>`;
  });

  return `<p>${html}</p>`;
}

export function parseTokensFromText(text: string) {
  const parts = text.split(/({\w+})/g);
  return parts.map((part) => {
    const match = part.match(/^{(\w+)}$/);
    if (match) {
      const label = match[1];
      return { type: "token", attrs: { label } };
    } else {
      return { type: "text", text: part };
    }
  });
}
