import { empresaService } from "@/features/shared/services/empresa-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";
import { uploadService } from "@/features/shared/services/upload-service";
import { useEmpresa } from "../../shared/hooks/use-empresa";
import { Configuracao } from "@/features/shared/models/configuracao";
import {
  AparenciaFormDTO,
  aparenciaFormSchema,
} from "../models/aparencia-form-dto";

export const useCustomizarAparencia = () => {
  const { empresa } = useEmpresa();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<AparenciaFormDTO>({
    resolver: zodResolver(aparenciaFormSchema),
    defaultValues: {
      logoUrl: empresa.configuracao.logoUrl ?? "",
      nomeDisplay: empresa.configuracao.nomeDisplay,
      enderecoDisplay: empresa.configuracao.enderecoDisplay,
      corPrimaria: empresa.configuracao.corPrimaria,
      corSobreposicao: empresa.configuracao.corSobreposicao,
    },
  });

  async function handleSubmit(data: z.infer<typeof aparenciaFormSchema>) {
    try {
      setIsSubmitting(true);
      const configuracao: Configuracao = {
        ...empresa.configuracao,
        ...data,
      };

      await empresaService.atualizarConfiguracao(configuracao);
      toast.success("Configurações salvas com sucesso.");
    } catch (error) {
      toast.error("Erro ao salvar configuraçôes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  async function handleUploadImagem(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<AparenciaFormDTO, "logoUrl">
  ) {
    const file = e.target.files?.[0];
    try {
      if (!file) {
        return;
      }

      setIsUploading(true);

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

      const url = await uploadService.uploadImagem(file);

      field.onChange(url);
      setPreview(url);
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem.");
    } finally {
      setIsUploading(false);
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
    isUploading,
  };
};
