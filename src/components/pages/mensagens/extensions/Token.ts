import { cn } from "@/lib/utils";
import { Node, mergeAttributes } from "@tiptap/core";
import { Editor } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    token: {
      insertToken: (type: "nome" | "link") => ReturnType;
    };
  }
}

export const Token = Node.create({
  name: "token",
  group: "inline",
  inline: true,
  atom: true,
  selectable: false,

  addAttributes() {
    return {
      type: {
        default: "nome",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-token]",
        getAttrs: (dom: HTMLElement) => ({
          type: dom.getAttribute("data-token"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    let cores = "";
    let label = "";
    switch (HTMLAttributes.type) {
      case "nome":
        label = "NOME CLIENTE";
        cores = "bg-blue-100 text-blue-800";
        break;
      case "link":
        label = "LINK ACOMPANHAMENTO";
        cores = "bg-green-100 text-green-800";
        break;
      default:
        break;
    }

    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-token": HTMLAttributes.type,
        class: cn("text-sm px-1.5 py-0.5 rounded font-mono", cores),
      }),
      label,
    ];
  },

  addCommands() {
    return {
      insertToken:
        (type: "nome" | "link") =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { type },
          });
        },
    };
  },
});
