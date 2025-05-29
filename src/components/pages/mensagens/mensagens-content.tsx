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

export default function MensagensContent() {
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
              <Tabs defaultValue="entrada" className="w-full">
                <TabsList className="mx-auto ">
                  <TabsTrigger value="entrada">Entrada</TabsTrigger>
                  <TabsTrigger value="chamada">Chamada</TabsTrigger>
                  <TabsTrigger value="removido">Removido</TabsTrigger>
                </TabsList>
                <TabsContent value="entrada">
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
                <TabsContent value="chamada">
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
                <TabsContent value="removido">
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
            <PreVisualizacaoMensagens />
          </div>
        </Card>
        <BotaoSalvarAlteracoes className="ml-auto block" />
      </form>
    </Form>
  );
}
