import { Extension } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    whatsappStrike: {
      toggleWhatsAppStrike: () => ReturnType;
    };
  }
}

export const WhatsAppStrike = Extension.create({
  name: "whatsappStrike",

  addCommands() {
    return {
      toggleWhatsAppStrike:
        () =>
        ({ state, dispatch, chain, tr }: CommandProps) => {
          const { from, to, empty } = state.selection;

          if (!dispatch) return false;

          if (empty) {
            const insertPos = from;
            const newTr = tr.insertText("~~", insertPos);
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
            selectedText.startsWith("~") && selectedText.endsWith("~");

          const newText = isStrike
            ? selectedText.slice(1, -1)
            : `~${selectedText}~`;

          const newTr = tr.insertText(newText, from, to);
          dispatch(newTr);
          return true;
        },
    };
  },
});
