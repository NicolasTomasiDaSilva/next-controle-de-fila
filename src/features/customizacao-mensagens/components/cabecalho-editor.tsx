import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { toWhatsAppMarkdown } from "@/utils/token-transform";

import { Editor } from "@tiptap/react";
import { Slash } from "lucide-react";
import { Bold, Italic } from "lucide-react";

interface CabecalhoEditorProps {
  editor: Editor;
  limiteCaracteres: number;
}
export default function CabecalhoEditor({
  editor,
  limiteCaracteres,
}: CabecalhoEditorProps) {
  return (
    <div className="flex flex-row items-center gap-2 justify-between bg-gray-50 p-2 border-b ">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            editor.chain().focus().toggleWhatsAppBold().run();
          }}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            editor.chain().focus().toggleWhatsAppItalic().run();
          }}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleWhatsAppStrike().run()}
        >
          <Slash className="h-4 w-4" />
        </Button>
        <div className="w-0.5 self-stretch bg-gray-200" />
      </div>
      {
        <span
          className={`text-sm  px-2 py-1 rounded ${
            toWhatsAppMarkdown(editor.getJSON()).length > limiteCaracteres
              ? "bg-red-100 text-red-800"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {toWhatsAppMarkdown(editor.getJSON()).length}/{limiteCaracteres}
        </span>
      }
    </div>
  );
}
