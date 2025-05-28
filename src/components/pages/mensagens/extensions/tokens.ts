// components/extensions/Token.ts
import { Node, mergeAttributes, CommandProps } from "@tiptap/core";

export interface TokenOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    token: {
      insertToken: (label: string) => ReturnType;
    };
  }
}

export const Token = Node.create<TokenOptions>({
  name: "token",
  group: "inline",
  inline: true,
  selectable: false,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      label: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-token]",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-token": "true",
        class: "bg-red-200",
      }),
      `{${node.attrs.label}}`,
    ];
  },

  addCommands() {
    return {
      insertToken:
        (label: string) =>
        ({ chain }: CommandProps) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { label },
            })
            .run();
        },
    };
  },
});
