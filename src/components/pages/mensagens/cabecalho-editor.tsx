import { Button } from "@/components/ui/button";
import {
  contarCaracteresSemPlaceholders,
  hasToken,
} from "@/utils/contar-caracteres";
import { htmlToWhatsappTemplate } from "@/utils/token-transform";

import { Editor } from "@tiptap/react";

import { MousePointerClick, Bold, Italic, Underline } from "lucide-react";

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
        {/* Estilo de texto */}
        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-zinc-800 text-white"
              : "bg-muted text-muted-foreground"
          }
        >
          <Bold size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-zinc-800 text-white"
              : "bg-muted text-muted-foreground"
          }
        >
          <Italic size={16} />
        </Button>

        {/* <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "bg-zinc-800 text-white"
              : "bg-muted text-muted-foreground"
          }
        >
          <Underline size={16} />
        </Button> */}
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => {
            editor.chain().focus().insertToken("nome").run();
          }}
          className="bg-blue-100 text-blue-800"
        >
          Inserir Nome
        </Button>
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => {
            editor.chain().focus().insertToken("link").run();
          }}
          className="bg-green-100 text-green-800"
        >
          Inserir Link
        </Button>
      </div>
      <span
        className={`text-sm  px-2 py-1 rounded ${
          contarCaracteresSemPlaceholders(
            htmlToWhatsappTemplate(editor.getHTML())
          ) > limiteCaracteres
            ? "bg-red-100 text-red-800"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {contarCaracteresSemPlaceholders(
          htmlToWhatsappTemplate(editor.getHTML())
        )}
        /{limiteCaracteres}
      </span>
    </div>
  );
}
