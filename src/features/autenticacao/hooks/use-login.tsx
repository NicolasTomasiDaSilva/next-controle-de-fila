import { empresaService } from "@/features/shared/services/empresa-service";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";
import { useCooldown } from "@/features/shared/hooks/use-cooldown";

import { empresaSchema } from "@/features/shared/models/empresa";
import { autenticacaoService } from "../services/autenticacao-service";
import { delayBotao } from "@/utils/delay-botao";
import { codigoAcessoSchema } from "@/features/shared/models/values";

export const useLogin = () => {
  const emailSchema = empresaSchema.pick({
    email: true,
  });
  type EmailFormData = z.infer<typeof emailSchema>;
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codigoAcessoFormSchema = z.object({
    codigo: codigoAcessoSchema,
  });

  type CodigoAcessoFormData = z.infer<typeof codigoAcessoFormSchema>;
  const codigoAcessoForm = useForm<CodigoAcessoFormData>({
    resolver: zodResolver(codigoAcessoFormSchema),
    defaultValues: { codigo: "" },
  });

  const { cooldown, startCooldown } = useCooldown(30);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  async function login({ email, codigo }: { email: string; codigo: string }) {
    await autenticacaoService.verificarCodigoAcesso(email, codigo);
    router.push("/fila");
  }

  const handleEnviarCodigo = async (data: EmailFormData) => {
    try {
      setIsSubmitting(true);
      await autenticacaoService.enviarCodigoAcesso(data.email);
      setEmail(data.email);
      startCooldown();
      setStep(2);
    } catch (error: any) {
      if (error?.message === "E-mail não encontrado") {
        emailForm.setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("Erro ao enviar código de acesso");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReenviarCodigo = async () => {
    try {
      if (cooldown > 0) return;
      setIsSubmitting(true);
      await autenticacaoService.enviarCodigoAcesso(email);
      startCooldown();
    } catch (error: any) {
      toast.error("Erro ao enviar código de acesso");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificarCodigo = async (data: CodigoAcessoFormData) => {
    try {
      setIsSubmitting(true);
      await login({ email, codigo: data.codigo });
    } catch (error: any) {
      if (error?.message === "Código não encontrado") {
        codigoAcessoForm.setError("codigo", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("Erro ao verificar código de acesso.");
      }
      setIsSubmitting(false);
    }
  };

  return {
    login,
    handleEnviarCodigo,
    handleReenviarCodigo,
    handleVerificarCodigo,
    emailForm,
    codigoAcessoForm,
    step,
    isSubmitting,
    cooldown,
  };
};
