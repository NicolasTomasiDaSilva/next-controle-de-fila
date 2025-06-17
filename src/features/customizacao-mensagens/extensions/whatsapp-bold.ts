import { Extension } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    whatsappBold: {
      toggleWhatsAppBold: () => ReturnType;
    };
  }
}

export const WhatsAppBold = Extension.create({
  name: "whatsappBold",

  addCommands() {
    return {
      toggleWhatsAppBold:
        () =>
        ({ state, dispatch, chain, tr }: CommandProps) => {
          const { from, to, empty } = state.selection;

          if (!dispatch) return false;

          if (empty) {
            // Insere dois asteriscos ** e posiciona o cursor no meio
            const insertPos = from;
            const newTr = tr.insertText("**", insertPos);
            const newSelection = TextSelection.create(
              newTr.doc,
              insertPos + 1,
              insertPos + 1
            );
            newTr.setSelection(newSelection);
            dispatch(newTr);
            return true;
          }

          // Com seleção: aplica ou remove asteriscos
          const selectedText = state.doc.textBetween(from, to, " ");
          const isBold =
            selectedText.startsWith("*") && selectedText.endsWith("*");

          const newText = isBold
            ? selectedText.slice(1, -1)
            : `*${selectedText}*`;

          const newTr = tr.insertText(newText, from, to);
          dispatch(newTr);
          return true;
        },
    };
  },
});
