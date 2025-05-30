"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";

import CabecalhoEditor from "./cabecalho-editor";
import { contarCaracteresSemPlaceholders } from "@/utils/contar-caracteres";
import { TokenText } from "./extensions/Token";
import { toWhatsAppMarkdown } from "@/utils/token-transform";

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
    extensions: [StarterKit, TokenText],
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
      </div>

      <p className="text-sm text-muted-foreground">
        Use as variáveis para personalizar a mensagem para cada cliente
      </p>
    </div>
  );
}
