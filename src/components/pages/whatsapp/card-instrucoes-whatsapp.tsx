import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Link,
  LinkIcon,
  ListChecks,
  MonitorSmartphone,
  MoreHorizontal,
  PlusCircle,
  QrCode,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";

export default function CardInstrucoesWhatsapp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <ListChecks className="inline mr-2" />
          Instruções
        </CardTitle>
        <CardDescription>
          Siga os passos abaixo para vincular seu WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full space-y-4">
        <div className="flex flex-row gap-4">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            1
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <Smartphone className="mr-2 inline w-4 h-4" />
              Abra o WhatsApp no seu celular
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row gap-4  ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            2
          </div>
          <div className="justify-self-stretch  w-full ">
            <p className="text-lg font-semibold">
              <Settings className="mr-2 inline w-4 h-4" />
              Toque em Menu (três pontos) ou Configurações
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row gap-4 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            3
          </div>
          <div className="justify-self-stretch   w-full">
            <p className="text-lg font-semibold">
              <MonitorSmartphone className="mr-2 inline w-4 h-4" />
              Selecione "Dispositivos conectados"
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row gap-4  ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            4
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <PlusCircle className="mr-2 inline w-4 h-4"></PlusCircle>Toque em
              "Conectar um dispositivo"
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row gap-4 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            5
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <QrCode className="mr-2 inline w-4 h-4"></QrCode>Aponte a câmera
              para o QR Code exibido nesta página
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
