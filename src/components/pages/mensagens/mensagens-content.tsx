"use client";

import { useState } from "react";
import { mensagensFormDTO, mensagensFormSchema } from "@/dtos/configuracao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmpresa } from "@/hooks/use-empresa";
import { Form } from "@/components/ui/form";

import BotaoSalvarAlteracoes from "@/components/shared/BotaoSalvarAlteracoes";
import CardPreVisualizacaoMensagens from "./card-pre-visualizacao-mensagens";

import { useConfiguracao } from "@/hooks/use-configuracao";
import CardEditorMensagens from "./card-editor-mensagens";

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
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
          <CardEditorMensagens
            tabSelecionada={tabSelecionada}
            setTabSelecionada={setTabSelecionada}
            form={form}
            resetCount={resetCount}
            setResetCount={setResetCount}
          />

          <CardPreVisualizacaoMensagens form={form} />
        </div>
        <BotaoSalvarAlteracoes
          isSubmitting={isSubmitting}
          className="ml-auto block"
        />
      </form>
    </Form>
  );
}
