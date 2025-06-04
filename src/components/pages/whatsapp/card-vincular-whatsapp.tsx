"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useConfiguracao } from "@/hooks/mensagens/use-configuracao";
import { useEmpresa } from "@/hooks/use-empresa";
import { useVincularWhatsapp } from "@/hooks/vinculacao-whatsapp/use-vincular-whatsapp";
import {
  LinkIcon,
  ListChecks,
  LogOut,
  QrCode,
  RefreshCcw,
  Settings,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DesconectarWhatsappDialog } from "./desconectar-dialog";

export default function CardVincularWhatsapp() {
  const {
    isChecked,
    isSubmitting,
    qrcode,
    isConectado,
    handleToggleWhatsapp,
    handleDesconectar,
    isQrcodeExpirado,
    handleGerarQrcodeNovamente,
  } = useVincularWhatsapp();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Settings className="inline mr-2" />
          Configuração WhatsApp
        </CardTitle>
        <CardDescription>
          Siga os passos abaixo para vincular seu WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="airplane-mode"
            checked={isChecked}
            onCheckedChange={handleToggleWhatsapp}
            disabled={isSubmitting}
            className="
            shadow-sm
              w-10 h-6 cursor-pointer
              [&>span]:w-5 [&>span]:h-5 [&>span]:translate-x-1
              data-[state=checked]:[&>span]:translate-x-4.5
              data-[state=checked]:bg-green-500
              disabled:opacity-50
            "
          />

          <Label htmlFor="airplane-mode text-lg font-semibold">
            Ativar notificações por WhatsApp
          </Label>
        </div>
        <div
          className={`w-full bg-gray-100 rounded-md border p-4 ${
            isChecked ? "bg-green-100 text-green-800 border-green-200" : ""
          }`}
        >
          <div>
            <p className="font-semibold">
              {isChecked ? "WhatsApp Ativado" : "WhatsApp Desativado"}
            </p>
            <p className="text-sm">
              {isChecked
                ? "As notificações serão enviadas automaticamente para os clientes na fila"
                : "Ative esta opção para enviar notificações automáticas para os clientes"}
            </p>
          </div>
        </div>
        {!isConectado && isChecked ? (
          <>
            <div>
              <p className="text-lg font-semibold">Conecte seu WhatsApp</p>
              <p className="font-sm text-muted-foreground">
                Escaneie o QR Code com seu WhatsApp para conectar sua conta
              </p>
            </div>
          </>
        ) : null}

        {!isConectado && isChecked ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            {qrcode ? (
              <img src={qrcode} className="w-48 h-48 object-contain" />
            ) : (
              <div className="w-48 h-48 flex justify-center items-center">
                {isQrcodeExpirado ? (
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    variant={"outline"}
                    onClick={handleGerarQrcodeNovamente}
                  >
                    <RefreshCcw></RefreshCcw>
                    {isSubmitting ? "Gerando..." : "Gerar Novamente"}
                  </Button>
                ) : (
                  <Spinner className=" h-20 w-20"></Spinner>
                )}
              </div>
            )}
          </div>
        ) : null}
        {isConectado && isChecked ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            <DesconectarWhatsappDialog
              handleDesconectar={handleDesconectar}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
