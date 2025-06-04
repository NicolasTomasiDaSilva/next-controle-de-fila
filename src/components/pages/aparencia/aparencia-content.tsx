"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Empresa } from "@/models/empresa";
import { useEffect, useState } from "react";
import { ConfiguracaoDados } from "./configuracao-dados";

import {
  configuracaoFormDTO,
  configuracaoFormSchema,
} from "@/dtos/configuracao";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ConfiguracaoVisual } from "./configuracao-visual";
import { Configuracao } from "@/models/configuracao";
import { empresaService } from "@/services/empresa-service";
import { toast } from "sonner";
import { CardPreVisualizacaoAparencia } from "./card-pre-visualizacao-aparencia";
import BotaoSalvarAlteracoes from "@/components/shared/BotaoSalvarAlteracoes";
import { useCustomizarAparencia } from "@/hooks/use-customizar-aparencia";
import { useEmpresa } from "@/hooks/use-empresa";

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
