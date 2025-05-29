import { Button } from "@/components/ui/button";
import { contarCaracteresSemPlaceholders } from "@/utils/contar-caracteres";

import { tokensFromHtml } from "@/utils/token-transform";
import { Editor } from "@tiptap/react";
import { MousePointerClick } from "lucide-react";

interface CabecalhoEditorProps {
  editor: Editor;
  limiteCaracteres: number;
}
export default function CabecalhoEditor({
  editor,
  limiteCaracteres,
}: CabecalhoEditorProps) {
  return (
    <div className="flex flex-row items-center gap-2 justify-between">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => editor.chain().focus().insertToken("nome").run()}
          className="bg-blue-100 text-blue-800"
        >
          Nome
        </Button>
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => editor.chain().focus().insertToken("link").run()}
          className="bg-green-100 text-green-800"
        >
          Link
        </Button>
      </div>
      <span
        className={`text-sm  px-2 py-1 rounded ${
          contarCaracteresSemPlaceholders(tokensFromHtml(editor.getHTML())) >
          limiteCaracteres
            ? "bg-red-100 text-red-800"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {contarCaracteresSemPlaceholders(tokensFromHtml(editor.getHTML()))}/
        {limiteCaracteres}
      </span>
    </div>
  );
}
