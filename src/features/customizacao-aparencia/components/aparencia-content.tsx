"use client";

import { ConfiguracaoDados } from "./configuracao-dados";
import { Form } from "@/components/ui/form";
import { ConfiguracaoVisual } from "./configuracao-visual";
import { CardPreVisualizacaoAparencia } from "./card-pre-visualizacao-aparencia";
import BotaoSalvarAlteracoes from "@/features/shared/components/botao-salvar-alteracoes";
import { useCustomizarAparencia } from "@/features/customizacao-aparencia/hooks/use-customizar-aparencia";

export function AparenciaContent() {
  const {
    form,
    handleSubmit,
    isSubmitting,
    preview,
    setPreview,
    inputFileRef,
    handleUploadImagem,
  } = useCustomizarAparencia();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4 ">
          <div className="w-full flex flex-col gap-4  md:flex-row ">
            <ConfiguracaoDados form={form}></ConfiguracaoDados>
            <ConfiguracaoVisual
              preview={preview}
              setPreview={setPreview}
              form={form}
              inputFileRef={inputFileRef}
              handleUploadImagem={handleUploadImagem}
            ></ConfiguracaoVisual>
          </div>
          <CardPreVisualizacaoAparencia
            form={form}
          ></CardPreVisualizacaoAparencia>
        </div>
        <BotaoSalvarAlteracoes
          className="block ml-auto"
          isSubmitting={isSubmitting}
        ></BotaoSalvarAlteracoes>
      </form>
    </Form>
  );
}
