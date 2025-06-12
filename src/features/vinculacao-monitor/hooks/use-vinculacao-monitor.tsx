import { CriarVinculacaoDTO } from "@/features/vinculacao-monitor/dto/criar-vinculacao-dto";

import { vinculacaoService } from "@/features/vinculacao-monitor/services/vinculacao-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEmpresa } from "../../shared/hooks/use-empresa";

import z from "zod";
import { codigoVinculacaoSchema } from "@/features/shared/models/values";

export const useVinculacaoMonitor = () => {
  const [openDialogSucesso, setOpenDialogSucesso] = useState(false);
  const { empresa } = useEmpresa();
  async function vincularMonitor(dto: CriarVinculacaoDTO) {
    await vinculacaoService.vincularMonitor(dto);
  }
  const formRef = useRef<HTMLFormElement>(null);

  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    codigo: codigoVinculacaoSchema,
  });
  type FormData = z.infer<typeof formSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { codigo: "" },
  });

  function handleQrScan(code: string) {
    setQrScannerOpen(false);
    form.setValue("codigo", code);
    formRef.current?.requestSubmit();
  }

  async function handleVerificarCodigo(data: FormData) {
    try {
      setIsSubmitting(true);
      const filaId = empresa.filas[0].id;
      await vincularMonitor({
        codigo: data.codigo,
        filaId: filaId,
        observacao: null,
      });
      form.setValue("codigo", "");
      setOpenDialogSucesso(true);
      setTimeout(() => setOpenDialogSucesso(false), 1500);
    } catch (error: any) {
      if (error.message === "Código não encontrado") {
        form.setError("codigo", {
          type: "manual",
          message: error.message,
        });
        toast.error("Código não encontrado.");
      } else {
        toast.error("Erro ao vincular monitor.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formRef,
    qrScannerOpen,
    setQrScannerOpen,
    handleQrScan,
    handleVerificarCodigo,
    form,
    isSubmitting,
    openDialogSucesso,
    setOpenDialogSucesso,
  };
};
