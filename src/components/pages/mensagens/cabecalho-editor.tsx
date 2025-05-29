import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { MousePointerClick } from "lucide-react";

interface CabecalhoEditorProps {
  editor: Editor;
}
export default function CabecalhoEditor({ editor }: CabecalhoEditorProps) {
  return (
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
  );
}
