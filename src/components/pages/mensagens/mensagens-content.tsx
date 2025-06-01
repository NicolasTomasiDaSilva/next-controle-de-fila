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
import CardEditor from "./card-editor";

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          async (data) => await handleAtualizarMensagens(data, setIsSubmitting)
        )}
      >
        <div className="flex gap-4 flex-col xl:flex-row ">
          <div className="flex-1 min-w-0 ">
            <CardEditor
              tabSelecionada={tabSelecionada}
              setTabSelecionada={setTabSelecionada}
              form={form}
              resetCount={resetCount}
              setResetCount={setResetCount}
            />
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
