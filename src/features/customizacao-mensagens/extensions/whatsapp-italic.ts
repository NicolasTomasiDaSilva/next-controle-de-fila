import { Extension } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { CommandProps } from "@tiptap/core";
import { is } from "date-fns/locale";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    whatsappItalic: {
      toggleWhatsAppItalic: () => ReturnType;
    };
  }
}

export const WhatsAppItalic = Extension.create({
  name: "whatsappItalic",

  addCommands() {
    return {
      toggleWhatsAppItalic:
        () =>
        ({ state, dispatch, chain, tr }: CommandProps) => {
          const { from, to, empty } = state.selection;

          if (!dispatch) return false;

          if (empty) {
            const insertPos = from;
            const newTr = tr.insertText("__", insertPos);
            const newSelection = TextSelection.create(
              newTr.doc,
              insertPos + 1,
              insertPos + 1
            );
            newTr.setSelection(newSelection);
            dispatch(newTr);
            return true;
          }
          const selectedText = state.doc.textBetween(from, to, " ");
          const isStrike =
            selectedText.startsWith("_") && selectedText.endsWith("_");

          const newText = isStrike
            ? selectedText.slice(1, -1)
            : `_${selectedText}_`;

          const newTr = tr.insertText(newText, from, to);
          dispatch(newTr);
          return true;
        },
    };
  },
});
