"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";

import CabecalhoEditor from "./cabecalho-editor";
import { contarCaracteresSemPlaceholders } from "@/utils/contar-caracteres";
import { TokenText } from "./extensions/Token";
import {
  htmlToWhatsappTemplate,
  whatsappToHtmlTemplate,
} from "@/utils/token-transform";

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
    content: whatsappToHtmlTemplate(value),
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] max-h-[300px] overflow-auto break-all whitespace-pre-wrap border p-2  bg-white border-none focus:outline-none rounded-md focus:ring-0",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(htmlToWhatsappTemplate(html));
      console.log(htmlToWhatsappTemplate(html));
    },
  });

  if (!editor) return null;

  return (
    <div className="">
      <CabecalhoEditor editor={editor} limiteCaracteres={limiteCaracteres} />
      <EditorContent editor={editor} />
      <p className="text-sm text-muted-foreground">
        Use as variáveis para personalizar a mensagem para cada cliente
      </p>
    </div>
  );
}
