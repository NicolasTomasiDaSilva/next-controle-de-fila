import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whatsappToHtml } from "@/utils/token-transform";
import { MessageCircle } from "lucide-react";
import MarkdownIt from "markdown-it/dist/index.cjs.js";

interface PreVisualizacaoMensagensProps {
  mensagem: string;
}
export default function PreVisualizacaoMensagens({
  mensagem,
}: PreVisualizacaoMensagensProps) {
  mensagem = mensagem.replace(/{nome}/g, "João da Silva");
  mensagem = mensagem.replace(/{link}/g, "https://example.com");
  const html = whatsappToHtml(mensagem);

  return (
    <>
      <CardHeader>
        <CardTitle className="whitespace-nowrap mb-4">
          Pré Visualização
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="w-full mx-auto  rounded-b-md shadow-sm bg-white">
          <div className="bg-green-600 py-3 px-3 font-semibold text-white">
            WhatsApp
          </div>
          <div className="px-3 py-3 space-y-4">
            <div className="flex flex-row items-center gap-2">
              <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Controle de Fila</p>
                <p className="text-xs text-muted-foreground">Hoje, 14:30</p>
              </div>
            </div>
            <div
              className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none break-words min-h-20 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </>
  );
}
