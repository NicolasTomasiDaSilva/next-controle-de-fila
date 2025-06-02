import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, LinkIcon, ListChecks, QrCode, Shield } from "lucide-react";

export default function CardInstrucoesWhatsapp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <ListChecks className="inline mr-2" />
          Instruções
        </CardTitle>
        <CardDescription>
          Siga os passos abaixo para vincular seu monitor ao sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-row gap-4 border-b pb-6 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            1
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <LinkIcon className="mr-2 inline w-4 h-4"></LinkIcon>Acesse o
              Monitor
            </p>
            <p className="text-sm text-muted-foreground">
              Acesse o link do monitor através do seu dispositivo:
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 border-b pb-6 pt-6 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            2
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <Shield className="mr-2 inline w-4 h-4"></Shield>Identificação
            </p>
            <p className="text-sm text-muted-foreground">
              Insira seu CPF ou CNPJ no campo de identificação do monitor
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 border-b pb-6 pt-6 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            3
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <QrCode className="mr-2 inline w-4 h-4"></QrCode>Código de
              Vinculação
            </p>
            <p className="text-sm text-muted-foreground">
              Insira o código de 4 dígitos exibido no monitor ou escaneie o QR
              Code
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4  pb-6 pt-6 ">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full flex-none text-white font-semibold">
            3
          </div>
          <div className="justify-self-stretch  w-full">
            <p className="text-lg font-semibold">
              <QrCode className="mr-2 inline w-4 h-4"></QrCode>Código de
              Vinculação
            </p>
            <p className="text-sm text-muted-foreground">
              Insira o código de 4 dígitos exibido no monitor ou escaneie o QR
              Code
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
