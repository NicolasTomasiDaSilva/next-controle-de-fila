"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "./rich-text-editor";
import { useState } from "react";
import { mensagensFormDTO, mensagensFormSchema } from "@/dtos/configuracao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmpresa } from "@/hooks/use-empresa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import WhatsAppMessageEditor from "./rich-text-editor";
import BotaoSalvarAlteracoes from "@/components/shared/BotaoSalvarAlteracoes";
import PreVisualizacaoMensagens from "./pre-visualizacao-mensagens";
import { AlertCircle, Car, PenLine, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mensagensPadraoWhatsapp } from "@/constantes/mensagens-padrao-whatsapp";
import { useConfiguracao } from "@/hooks/use-configuracao";

export default function MensagensContent() {
  const [resetCount, setResetCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabSelecionada, setTabSelecionada] = useState<
    "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido"
  >("mensagemEntrada");

  const { handleAtualizarMensagens, configuracao } = useConfiguracao();

  const form = useForm<mensagensFormDTO>({
    resolver: zodResolver(mensagensFormSchema),
    defaultValues: {
      mensagemEntrada: configuracao.mensagemEntrada,
      mensagemChamada: configuracao.mensagemChamada,
      mensagemRemovido: configuracao.mensagemRemovido,
    },
  });

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          async (data) => await handleAtualizarMensagens(data, setIsSubmitting)
        )}
      >
        <div className="flex gap-4 flex-col xl:flex-row ">
          <div className="flex-1 min-w-0 ">
            <Card>
              <CardHeader>
                <CardTitle className="whitespace-nowrap mb-4">
                  <PenLine className="inline mr-2" />
                  Editor Mensagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={tabSelecionada}
                  onValueChange={(value) =>
                    setTabSelecionada(
                      value as
                        | "mensagemEntrada"
                        | "mensagemChamada"
                        | "mensagemRemovido"
                    )
                  }
                  className="w-full"
                >
                  <TabsList className="mx-auto md:ml-0 h-10 px-2 shadow-sm">
                    <TabsTrigger value="mensagemEntrada">
                      Entrada
                      {errors.mensagemEntrada && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="mensagemChamada">
                      Chamada
                      {errors.mensagemChamada && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="mensagemRemovido">
                      Removido
                      {errors.mensagemRemovido && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="mensagemEntrada">
                    <FormField
                      control={form.control}
                      name="mensagemEntrada"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RichTextEditor
                              key={resetCount}
                              limiteCaracteres={500}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="mensagemChamada">
                    <FormField
                      control={form.control}
                      name="mensagemChamada"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RichTextEditor
                              key={resetCount}
                              limiteCaracteres={500}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="mensagemRemovido">
                    <FormField
                      control={form.control}
                      name="mensagemRemovido"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RichTextEditor
                              key={resetCount}
                              limiteCaracteres={500}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  onClick={() => {
                    form.reset(mensagensPadraoWhatsapp);
                    setResetCount(resetCount + 1);
                  }}
                  variant={"outline"}
                >
                  <RotateCcw />
                  Redefinir
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex-1  min-w-0">
            <PreVisualizacaoMensagens form={form} />
          </div>
        </div>
        <BotaoSalvarAlteracoes
          isSubmitting={isSubmitting}
          className="ml-auto block"
        />
      </form>
    </Form>
  );
}
