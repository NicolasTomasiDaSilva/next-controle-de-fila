"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { htmlFromTokens, tokensFromHtml } from "@/utils/token-transform";
import { Token } from "./extensions/Token";

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
      const res = tokensFromHtml(html);
      console.log(res);
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().insertToken("nome").run()}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
        >
          Nome
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().insertToken("link").run()}
          className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
