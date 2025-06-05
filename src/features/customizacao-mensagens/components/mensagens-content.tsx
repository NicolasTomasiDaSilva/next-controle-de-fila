"use client";

import { useState } from "react";
import { mensagensFormDTO, mensagensFormSchema } from "@/dtos/configuracao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import BotaoSalvarAlteracoes from "@/features/shared/components/botao-salvar-alteracoes";
import CardPreVisualizacaoMensagens from "./card-pre-visualizacao-mensagens";

import CardEditorMensagens from "./card-editor-mensagens";
import { usePersonalizacaoMensagens } from "@/features/customizacao-mensagens/hooks/use-personalizacao-mensagens";

export default function MensagensContent() {
  const [resetCount, setResetCount] = useState(0);

  const [tabSelecionada, setTabSelecionada] = useState<
    "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido"
  >("mensagemEntrada");

  const { handleAtualizarMensagens, configuracao, isSubmitting } =
    usePersonalizacaoMensagens();

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
      <form onSubmit={form.handleSubmit(handleAtualizarMensagens)}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
          <div className="flex-1 basis-0 min-w-0">
            <CardEditorMensagens
              tabSelecionada={tabSelecionada}
              setTabSelecionada={setTabSelecionada}
              form={form}
              resetCount={resetCount}
              setResetCount={setResetCount}
            />
          </div>
          <div className="flex-1 basis-0 min-w-0">
            <CardPreVisualizacaoMensagens form={form} />
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
