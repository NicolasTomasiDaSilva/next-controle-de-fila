import {
  configuracaoFormDTO,
  configuracaoFormSchema,
} from "@/dtos/configuracao";
import { Configuracao } from "@/models/configuracao";
import { empresaService } from "@/services/empresa-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEmpresa } from "./use-empresa";
import z from "zod";

export const useCustomizarAparencia = () => {
  const { empresa } = useEmpresa();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<configuracaoFormDTO>({
    resolver: zodResolver(configuracaoFormSchema),
    defaultValues: {
      logoUrl: empresa.configuracao.logoUrl ?? "",
      nomeDisplay: empresa.configuracao.nomeDisplay,
      enderecoDisplay: empresa.configuracao.enderecoDisplay,
      corPrimaria: empresa.configuracao.corPrimaria,
      corSobreposicao: empresa.configuracao.corSobreposicao,
    },
  });

  async function handleSubmit(data: z.infer<typeof configuracaoFormSchema>) {
    try {
      setIsSubmitting(true);
      const configuracao: Configuracao = {
        ...empresa.configuracao,
        ...data,
      };

      await empresaService.atualizarConfiguracao(configuracao);
      toast.success("Configuração atualizada com sucesso.", { icon: "✅" });
    } catch (error) {
      toast.error("Erro ao atualizadar configuração.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, handleSubmit, isSubmitting };
};
