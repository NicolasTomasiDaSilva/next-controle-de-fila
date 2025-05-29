import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";

export default function PreVisualizacaoMensagens() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="whitespace-nowrap mb-4">
          Pré Visualização
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="max-w-xs mx-auto  rounded-b-md shadow-sm bg-white">
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
            <p className="bg-green-100 py-3 px-3 rounded-md rounded-tl-none text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              qui cumque facere mollitia eius similique, nesciunt
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </div>
  );
}
