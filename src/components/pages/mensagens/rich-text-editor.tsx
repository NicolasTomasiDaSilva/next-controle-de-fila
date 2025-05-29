"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { htmlFromTokens, tokensFromHtml } from "@/utils/token-transform";
import { Token } from "./extensions/Token";

import CabecalhoEditor from "./cabecalho-editor";
import { contarCaracteresSemPlaceholders } from "@/utils/contar-caracteres";

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
    extensions: [StarterKit, Token],
    content: htmlFromTokens(value),
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] max-h-[300px] overflow-auto break-all whitespace-pre-wrap border p-2 rounded bg-white",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(tokensFromHtml(html));
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <EditorContent editor={editor} />

      <p className="text-sm text-muted-foreground">
        Use as variáveis para personalizar a mensagem para cada cliente
      </p>
      <CabecalhoEditor editor={editor} limiteCaracteres={limiteCaracteres} />
    </div>
  );
}
