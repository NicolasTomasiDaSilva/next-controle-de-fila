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
import { useState } from "react";
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
import { PreVisualizacaoAparencia } from "./pre-visualizacao-aparencia";

interface ConfiguracaoContentProps {
  empresa: Empresa;
}

export function ConfiguracaoContent({ empresa }: ConfiguracaoContentProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<configuracaoFormDTO>({
    resolver: zodResolver(configuracaoFormSchema),
    defaultValues: {
      logoUrl: empresa.configuracao.logoUrl ?? "",
      nomeDisplay: empresa.configuracao.nomeDisplay,
      enderecoDisplay: empresa.configuracao.enderecoDisplay ?? "",
      corPrimaria: empresa.configuracao.corPrimaria,
      corSobreposicao: empresa.configuracao.corSobreposicao,
    },
  });

  async function handleSubmit(data: z.infer<typeof configuracaoFormSchema>) {
    try {
      setLoading(true);
      const configuracao: Configuracao = {
        ...empresa.configuracao,
        ...data,
      };

      await empresaService.atualizarConfiguracao(configuracao);
      toast.success("Configuração atualizada com sucesso.", { icon: "✅" });
    } catch (error) {
      toast.error("Erro ao atualizadar configuração.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Card className="w-full">
          <ConfiguracaoDados form={form}></ConfiguracaoDados>
          <ConfiguracaoVisual form={form}></ConfiguracaoVisual>
          <PreVisualizacaoAparencia form={form}></PreVisualizacaoAparencia>
        </Card>
        <Button
          type="submit"
          className="w-full sm:w-[max-content] block ml-auto"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}
