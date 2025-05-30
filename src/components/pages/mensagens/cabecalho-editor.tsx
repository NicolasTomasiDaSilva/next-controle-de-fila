import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { contarCaracteresSemPlaceholders } from "@/utils/contar-caracteres";

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
    <div className="flex flex-row items-center gap-2 justify-between bg-gray-50 p-2 	border-b ">
      <div className="flex gap-2">
        {/* Estilo de texto */}

        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <div className="w-0.5 self-stretch bg-gray-200" />
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
        >
          {"{nome}"}
        </Button>
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => {
            editor.chain().focus().insertToken("link").run();
          }}
        >
          {"{link}"}
        </Button>
      </div>
      {/* <span
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
      </span> */}
    </div>
  );
}
