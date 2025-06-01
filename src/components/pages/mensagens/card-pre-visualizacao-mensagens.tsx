import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mensagensFormDTO } from "@/dtos/configuracao";
import { whatsappToHtml } from "@/utils/token-transform";
import { Eye, MessageCircle } from "lucide-react";
import MarkdownIt from "markdown-it/dist/index.cjs.js";
import { UseFormReturn } from "react-hook-form";

interface CardPreVisualizacaoMensagensProps {
  form: UseFormReturn<mensagensFormDTO>;
}
export default function CardPreVisualizacaoMensagens({
  form,
}: CardPreVisualizacaoMensagensProps) {
  let mensagemEntrada = form.watch("mensagemEntrada") || "";
  let mensagemChamada = form.watch("mensagemChamada") || "";
  let mensagemRemovido = form.watch("mensagemRemovido") || "";

  mensagemEntrada = mensagemEntrada.replace(/{nome}/g, "João da Silva");
  mensagemEntrada = mensagemEntrada.replace(/{link}/g, "https://example.com");
  const htmlMensagemEntrada = whatsappToHtml(mensagemEntrada);

  mensagemChamada = mensagemChamada.replace(/{nome}/g, "João da Silva");
  mensagemChamada = mensagemChamada.replace(/{link}/g, "https://example.com");
  const htmlMensagemChamada = whatsappToHtml(mensagemChamada);

  mensagemRemovido = mensagemRemovido.replace(/{nome}/g, "João da Silva");
  mensagemRemovido = mensagemRemovido.replace(/{link}/g, "https://example.com");
  const htmlMensagemRemovido = whatsappToHtml(mensagemRemovido);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="whitespace-nowrap">
          <Eye className="inline mr-2" />
          Pré-Visualização
        </CardTitle>
        <CardDescription>Veja como ficará sua configuração</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full mx-auto  rounded-b-md shadow-sm bg-white h-full">
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
            <div>
              <p className="font-semibold">Entrada:</p>
              <div className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none min-h-20 ">
                <div
                  className="whitespace-pre-wrap break-words min-w-0 max-w-full"
                  dangerouslySetInnerHTML={{ __html: htmlMensagemEntrada }}
                ></div>
              </div>
            </div>
            <div>
              <p className="font-semibold">Chamada:</p>
              <div className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none min-h-20 ">
                <div
                  className="whitespace-pre-wrap break-words min-w-0 max-w-full"
                  dangerouslySetInnerHTML={{ __html: htmlMensagemChamada }}
                ></div>
              </div>
            </div>
            <div>
              <p className="font-semibold">Removido:</p>
              <div className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none min-h-20 ">
                <div
                  className="whitespace-pre-wrap break-words min-w-0 max-w-full"
                  dangerouslySetInnerHTML={{ __html: htmlMensagemRemovido }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
