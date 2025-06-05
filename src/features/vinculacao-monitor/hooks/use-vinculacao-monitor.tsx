import { criarVinculacaoDTO } from "@/features/vinculacao-monitor/models/criar-vinculacao-dto";

import { vinculacaoService } from "@/features/vinculacao-monitor/services/vinculacao-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEmpresa } from "../../shared/hooks/use-empresa";
import {
  codigoVinculacaoDTO,
  codigoVinculacaoSchema,
} from "../models/codigo-vinculacao";

export const useVinculacaoMonitor = () => {
  const [openDialogSucesso, setOpenDialogSucesso] = useState(false);
  const { empresa } = useEmpresa();
  async function vincularMonitor(dto: criarVinculacaoDTO) {
    await vinculacaoService.vincularMonitor(dto);
  }
  const formRef = useRef<HTMLFormElement>(null);

  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const codigoVinculacaoForm = useForm<codigoVinculacaoDTO>({
    resolver: zodResolver(codigoVinculacaoSchema),
    defaultValues: { codigo: "" },
  });

  function handleQrScan(code: string) {
    setQrScannerOpen(false);
    codigoVinculacaoForm.setValue("codigo", code);
    formRef.current?.requestSubmit();
  }

  async function handleVerificarCodigo(data: codigoVinculacaoDTO) {
    try {
      setIsSubmitting(true);
      const filaId = empresa.filas[0].id;
      await vincularMonitor({
        codigo: data.codigo,
        filaId: filaId,
        observacao: null,
      });
      codigoVinculacaoForm.setValue("codigo", "");
      setOpenDialogSucesso(true);
      setTimeout(() => setOpenDialogSucesso(false), 1500);
    } catch (error: any) {
      if (error.message === "Código não encontrado") {
        codigoVinculacaoForm.setError("codigo", {
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
    codigoVinculacaoForm,
    isSubmitting,
    openDialogSucesso,
    setOpenDialogSucesso,
  };
};
