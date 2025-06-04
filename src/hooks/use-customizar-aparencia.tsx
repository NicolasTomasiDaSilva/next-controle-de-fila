import {
  configuracaoFormDTO,
  configuracaoFormSchema,
} from "@/dtos/configuracao";
import { Configuracao } from "@/models/configuracao";
import { empresaService } from "@/services/empresa-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEmpresa } from "./use-empresa";
import z from "zod";
import { uploadService } from "@/services/upload-service";

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

  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  async function handleUploadImagem(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<configuracaoFormDTO, "logoUrl">
  ) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Apenas arquivos PNG ou JPG são permitidos.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("O tamanho máximo permitido é 2MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { url } = await uploadService.uploadImagem(formData);

      field.onChange(url);
      setPreview(url);
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem.");
    }
  }

  return {
    form,
    handleSubmit,
    isSubmitting,
    preview,
    inputFileRef,
    handleUploadImagem,
    setPreview,
  };
};
