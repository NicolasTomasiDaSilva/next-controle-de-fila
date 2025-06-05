import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";

interface FooterEditorProps {
  editor: Editor;
  limiteCaracteres: number;
}
export default function FooterEditor({
  editor,
  limiteCaracteres,
}: FooterEditorProps) {
  return (
    <div className="flex flex-row items-center gap-2 justify-between bg-gray-50 p-1 	border-t ">
      <div className="flex gap-2">
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
    </div>
  );
}
