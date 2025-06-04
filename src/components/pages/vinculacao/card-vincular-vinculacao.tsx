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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useVinculacaoMonitor } from "@/hooks/vinculacao-monitor/use-vinculacao-monitor";

import { QrScanner2 } from "./QrScanner2";

import { Link, LinkIcon, QrCode, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

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
            <div className="flex items-center justify-center my-5">
              <FormField
                control={codigoVinculacaoForm.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mx-auto">
                      Código de Vinculação
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="w-12 h-12 text-2xl rounded-md border border-input"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-12 h-12 text-2xl rounded-md border border-input"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-12 h-12 text-2xl rounded-md border border-input"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-12 h-12 text-2xl rounded-md border border-input"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage className="mx-auto" />
                  </FormItem>
                )}
              />
            </div>

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
