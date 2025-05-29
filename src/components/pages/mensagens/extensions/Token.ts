import { CommandProps, Extension } from "@tiptap/core";

import "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tokenText: {
      insertToken: (type: "nome" | "link") => ReturnType;
    };
  }
}

export const TokenText = Extension.create({
  name: "tokenText",

  addCommands() {
    return {
      insertToken:
        (type: "nome" | "link") =>
        ({ chain }: CommandProps) => {
          return chain().insertContent(`{{${type}}}`).run();
        },
    };
  },
});
