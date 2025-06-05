import { empresaService } from "@/services/empresa-service";
import { useRouter } from "next/navigation";
import { useCooldown } from "../use-cooldown";
import { useState } from "react";
import { toast } from "sonner";
import { codigoAcessoDTO, codigoAcessoSchema } from "@/models/codigos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { empresaSchema } from "@/models/empresa";
import z from "zod";

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
    await empresaService.verificarCodigoAcesso(email, codigo);
    router.push("/fila");
  }

  const handleEnviarCodigo = async (data: z.infer<typeof emailSchema>) => {
    try {
      setIsSubmitting(true);
      await empresaService.enviarCodigoAcesso(data.email);
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
      await empresaService.enviarCodigoAcesso(email);
      startCooldown();
    } catch (error: any) {
      toast.error("Erro ao enviar código de acesso");
    } finally {
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
