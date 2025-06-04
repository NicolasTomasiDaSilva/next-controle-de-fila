"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useVinculacaoMonitor } from "@/hooks/vinculacao-monitor/use-vinculacao-monitor";

import { QrScanner2 } from "./QrScanner2";

import { Link, LinkIcon, QrCode, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CardVincularVinculacao() {
  const {
    formRef,
    qrScannerOpen,
    setQrScannerOpen,
    handleQrScan,
    handleVerificarCodigo,
    codigoVinculacaoForm,
    isSubmitting,
  } = useVinculacaoMonitor();

  return (
    <Form {...codigoVinculacaoForm}>
      <form
        ref={formRef}
        onSubmit={codigoVinculacaoForm.handleSubmit(handleVerificarCodigo)}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Link className="inline mr-2" />
              Vincular
            </CardTitle>
            <CardDescription>
              Escaneie o QR Code ou digite o código exibido no monitor para
              estabelecer a conexão
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full space-y-4">
            <Button
              type="button"
              onClick={() => setQrScannerOpen(true)}
              className="mx-auto bg-gray-100 rounded-md h-30 w-30 flex items-center justify-center"
              variant="ghost"
            >
              <QrCode className="!w-20 !h-20 text-gray-500" />
            </Button>
            {qrScannerOpen && (
              <QrScanner2
                onScan={handleQrScan}
                onClose={() => setQrScannerOpen(false)}
              />
            )}

            <p className="text-sm text-muted-foreground text-center">
              Escaneie o QR Code do monitor
            </p>
            <div className="flex items-center justify-center gap-2">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-sm">ou</span>
              <Separator className="flex-1" />
            </div>
            <FormField
              control={codigoVinculacaoForm.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Vinculação</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-center text-center h-12"
                      placeholder="Digite o código"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z0-9]{0,4}$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-12"
              variant={"azul"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Vinculando..." : "Vincular Monitor"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
