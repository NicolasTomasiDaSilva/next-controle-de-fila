import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MensagensFormDTO } from "@/dtos/configuracao";
import { format } from "@flasd/whatsapp-formatting";
import { Car, Eye, MessageCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import usePreVisualizacaoMensagens from "../hooks/use-pre-visualizacao-mensagens";
import { Badge } from "@/components/ui/badge";

interface CardPreVisualizacaoMensagensProps {
  form: UseFormReturn<MensagensFormDTO>;
  tabSelecionada: "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido";
}
export default function CardPreVisualizacaoMensagens({
  form,
  tabSelecionada,
}: CardPreVisualizacaoMensagensProps) {
  const { mensagemEntrada, mensagemChamada, mensagemRemovido } =
    usePreVisualizacaoMensagens(form);

  const mensagem =
    tabSelecionada === "mensagemEntrada"
      ? mensagemEntrada
      : tabSelecionada === "mensagemChamada"
      ? mensagemChamada
      : mensagemRemovido;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="whitespace-nowrap">
          <Eye className="inline mr-2" />
          Pré-Visualização
        </CardTitle>
        <CardDescription>Veja como ficará sua configuração</CardDescription>
      </CardHeader>
      <CardContent className="h-full space-y-4">
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
            <div className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none min-h-30 ">
              <div
                className="whitespace-pre-wrap break-words min-w-0 max-w-full"
                dangerouslySetInnerHTML={{ __html: format(mensagem) }}
              ></div>
            </div>
          </div>
        </div>
        <Card className="gap-4 bg-gray-50 ">
          <CardHeader className="leading-none gap-0">
            <CardTitle className="whitespace-nowrap text-xl  ">
              Dicas de Formatação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="">
              Use{" "}
              <Badge
                className="font-semibold bg-white border border-gray-300 text-sm"
                variant={"outline"}
              >
                *texto*
              </Badge>{" "}
              para texto em <b>negrito</b>
            </p>
            <p className="">
              Use{" "}
              <Badge
                className="font-semibold bg-white border border-gray-300 text-sm"
                variant={"outline"}
              >
                _texto_
              </Badge>{" "}
              para texto em <i>itálico</i>
            </p>
            <p className="">
              Use{" "}
              <Badge
                className="font-semibold bg-white border border-gray-300 text-sm"
                variant={"outline"}
              >
                ~texto~
              </Badge>{" "}
              para texto <s>riscado</s>
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
