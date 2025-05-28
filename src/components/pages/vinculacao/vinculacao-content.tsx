"use client";

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
import { QrCode } from "lucide-react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";

import { codigoVinculacaoDTO, codigoVinculacaoSchema } from "@/models/codigos";
import { useVinculacao } from "@/hooks/use-vinculacao";
import { EmpresaContext } from "@/contexts/empresa-context";
import { useEmpresa } from "@/hooks/use-empresa";
import { toast } from "sonner";

import { QrScanner } from "./QrScanner";
import { QrScanner2 } from "./QrScanner2";

export default function VinculacaoContent() {
  const formRef = useRef<HTMLFormElement>(null);
  const { empresa } = useEmpresa();
  const { vincularMonitor } = useVinculacao();
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const codigoVinculacaoForm = useForm<codigoVinculacaoDTO>({
    resolver: zodResolver(codigoVinculacaoSchema),
    defaultValues: { codigo: "" },
  });

  function handleQrScan(code: string) {
    setQrScannerOpen(false);
    codigoVinculacaoForm.setValue("codigo", code);
    formRef.current?.requestSubmit();
  }

  async function handleVerificarCodigo(data: codigoVinculacaoDTO) {
    try {
      setLoading(true);
      const filaId = empresa.filas[0].id;
      await vincularMonitor({
        codigo: data.codigo,
        filaId: filaId,
        observacao: null,
      });
      codigoVinculacaoForm.setValue("codigo", "");
      toast.success("Monitor vinculado com sucesso.");
    } catch (error: any) {
      if (error.message === "Código não encontrado") {
        codigoVinculacaoForm.setError("codigo", {
          type: "manual",
          message: error.message,
        });
        toast.error("Código não encontrado.");
      } else {
        toast.error("Erro ao vincular monitor.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md space-y-4 mx-auto mt-[15vh] ">
      <CardHeader>
        <CardTitle className="text-lg">Vincular Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="bg-gray-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Instruções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <span className="font-bold">1.</span> Acesse o link do monitor:
              https://example.com
            </p>
            <p className="text-muted-foreground">
              <span className="font-bold">2.</span> Insira o CPF ou CNPJ no
              campo de texto
            </p>
            <p className="text-muted-foreground">
              <span className="font-bold">3.</span> Insira o código de 4 dígitos
              ou escaneie o QR Code
            </p>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="block space-y-4">
        <Form {...codigoVinculacaoForm}>
          <form
            ref={formRef}
            onSubmit={codigoVinculacaoForm.handleSubmit(handleVerificarCodigo)}
            className="space-y-4"
          >
            <div className="flex flex-row gap-2 justify-center">
              <Button
                variant="outline"
                type="button" // garante que não seja submit
                onClick={() => {
                  setQrScannerOpen(true);
                }}
              >
                <QrCode />
              </Button>

              {qrScannerOpen && (
                <QrScanner2
                  onScan={handleQrScan}
                  onClose={() => setQrScannerOpen(false)}
                />
              )}
              <FormField
                control={codigoVinculacaoForm.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-35"
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
            </div>
            <Button
              type="submit"
              className="w-[max-content]  mx-auto block"
              disabled={loading}
            >
              {loading ? "Vinculando..." : "Vincular"}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
