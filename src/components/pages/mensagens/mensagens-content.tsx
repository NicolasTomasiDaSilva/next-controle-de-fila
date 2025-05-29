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
import { AlertCircle } from "lucide-react";

export default function MensagensContent() {
  const [tabSelecionada, setTabSelecionada] = useState<
    "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido"
  >("mensagemEntrada");
  const { empresa } = useEmpresa();

  const configuracao = empresa.configuracao;

  async function handleSubmit(data: mensagensFormDTO) {
    console.log(data);
  }

  const form = useForm<mensagensFormDTO>({
    resolver: zodResolver(mensagensFormSchema),
    defaultValues: {
      mensagemEntrada: configuracao.mensagemEntrada ?? "",
      mensagemChamada: configuracao.mensagemChamada ?? "",
      mensagemRemovido: configuracao.mensagemRemovido ?? "",
    },
  });

  const mensagemAtual = form.watch(tabSelecionada);
  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full  md:grid md:grid-cols-2">
          <div className="">
            <CardHeader>
              <CardTitle className="whitespace-nowrap mb-4">
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
                <TabsList className="mx-auto ">
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
                            limiteCaracteres={100}
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
                            limiteCaracteres={100}
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
                            limiteCaracteres={100}
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
          </div>
          <div className="">
            <PreVisualizacaoMensagens mensagem={mensagemAtual ?? ""} />
          </div>
        </Card>
        <BotaoSalvarAlteracoes className="ml-auto block" />
      </form>
    </Form>
  );
}
