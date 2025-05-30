"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";

import CabecalhoEditor from "./cabecalho-editor";

import { TokenText } from "./extensions/Token";
import { toWhatsAppMarkdown } from "@/utils/token-transform";
import Strike from "@tiptap/extension-strike";
import FooterEditor from "./footer-editor";

const BoldWithoutInputRules = Bold.extend({
  addInputRules() {
    return [];
  },
});

const ItalicWithoutInputRules = Italic.extend({
  addInputRules() {
    return []; // remove as regras de input
  },
});
const StrikeWithoutInputRules = Strike.extend({
  addInputRules() {
    return []; // remove as regras de input
  },
});

interface RichTextEditorProps {
  value: string;
  limiteCaracteres: number;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
  limiteCaracteres,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
      }),
      BoldWithoutInputRules,
      ItalicWithoutInputRules,
      StrikeWithoutInputRules,
      TokenText,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] max-h-[300px] border-none focus:outline-none rounded-md focus:ring-0 overflow-auto break-all whitespace-pre-wrap p-2  bg-white ",
      },
    },
    onUpdate({ editor }) {
      const markdownWhatsApp = toWhatsAppMarkdown(editor.getJSON());
      onChange(markdownWhatsApp);
    },
  });

  if (!editor) return null;

  return (
    <div className="">
      <div className="border rounded-md overflow-hidden shadow-sm">
        <CabecalhoEditor editor={editor} limiteCaracteres={limiteCaracteres} />
        <EditorContent editor={editor} />
        <FooterEditor editor={editor} limiteCaracteres={limiteCaracteres} />
      </div>

      <p className="text-sm text-muted-foreground">
        Use as variáveis para personalizar a mensagem para cada cliente
      </p>
    </div>
  );
}
