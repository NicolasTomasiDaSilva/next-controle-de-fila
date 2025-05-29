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
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Token],
    content: htmlFromTokens(value),
    editorProps: {
      attributes: {
        class: "min-h-[120px] border p-2 rounded bg-white",
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
        Use as variáveis para personalizar a mensagem para cada cliente.
      </p>
      <CabecalhoEditor editor={editor} />
      <p>
        {contarCaracteresSemPlaceholders(tokensFromHtml(editor.getHTML()))}/100
      </p>
    </div>
  );
}
