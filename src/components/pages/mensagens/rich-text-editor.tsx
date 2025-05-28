"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import { htmlFromTokens, tokensFromHtml } from "@/utils/token-transform";
import { Token } from "./extensions/tokens";

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
    onUpdate({ editor }) {
      console.log(value);
      const plainTextWithTokens = tokensFromHtml(editor.getJSON());
      onChange(plainTextWithTokens);
    },
  });

  useEffect(() => {
    if (editor && tokensFromHtml(editor.getJSON()) !== value) {
      editor.commands.setContent(htmlFromTokens(value));
    }
  }, [value]);

  const insertToken = (label: string) => {
    editor?.commands.insertToken(label);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => insertToken("nome")}
          className="bg-gray-300 px-2 py-1 rounded text-sm"
        >
          NOME CLIENTE
        </button>
        <button
          type="button"
          onClick={() => insertToken("link")}
          className="bg-gray-300 px-2 py-1 rounded text-sm"
        >
          LINK ACOMPANHAMENTO
        </button>
      </div>
      <div className="border rounded p-2 min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
