import { empresaService } from "@/features/shared/services/empresa-service";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";
import { useCooldown } from "@/features/shared/hooks/use-cooldown";
import { codigoAcessoDTO, codigoAcessoSchema } from "../models/codigo-acesso";
import { empresaSchema } from "@/features/shared/models/empresa";
import { autenticacaoService } from "../services/autenticacao-service";
import { delayBotao } from "@/utils/delay-botao";

export const useLogin = () => {
  const emailSchema = empresaSchema.pick({
    email: true,
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codigoAcessoForm = useForm<codigoAcessoDTO>({
    resolver: zodResolver(codigoAcessoSchema),
    defaultValues: { codigo: "" },
  });

  const { cooldown, startCooldown } = useCooldown(30);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  async function login({ email, codigo }: { email: string; codigo: string }) {
    try {
      setIsSubmitting(true);
      await autenticacaoService.verificarCodigoAcesso(email, codigo);
      router.push("/fila");
      toast.success("Logado com sucesso.", { icon: "🔓" });
    } catch (error) {
      toast.error("Erro ao fazer login.");
    } finally {
      await delayBotao(1000);
      setIsSubmitting(false);
    }
  }

  const handleEnviarCodigo = async (data: z.infer<typeof emailSchema>) => {
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
      await delayBotao(1000);
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
      await delayBotao(1000);
      setIsSubmitting(false);
    }
  };

  const handleVerificarCodigo = async (data: codigoAcessoDTO) => {
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
    } finally {
      await delayBotao(1000);
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
