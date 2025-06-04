import { useEffect, useState } from "react";
import { toast } from "sonner";
import { empresaService } from "@/services/empresa-service";
import { whatsappService } from "@/services/whatsapp-service";
import { qrcodeResponseDTO, sessaoWhatsappDTO } from "@/dtos/whatsapp";
import { set } from "date-fns";
import { th } from "date-fns/locale";
import { useEmpresa } from "../use-empresa";

export function useVinculacaoWhatsapp() {
  const { empresa } = useEmpresa();
  const configuracao = empresa.configuracao;
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConectado, setIsConectado] = useState<boolean>(false);
  const [buscarQrcode, setBuscarQrcode] = useState<boolean>(false);
  const [isQrcodeExpirado, setIsQrcodeExpirado] = useState<boolean>(false);

  const INTERVALO_MS = 5000;

  function handleGerarQrcodeNovamente() {
    setIsSubmitting(true);
    setBuscarQrcode(true);
    setIsQrcodeExpirado(false);
    setIsSubmitting(false);
  }

  async function handleDesconectar() {
    try {
      setIsSubmitting(true);
      await whatsappService.desconectarWhatsapp();
      try {
        configuracao.whatsappAtivo = false;
        await empresaService.atualizarConfiguracao(configuracao);
      } catch (error) {}
      setIsConectado(false);
      setIsChecked(false);

      toast.success("Desconectado com sucesso.");
    } catch (error: any) {
      toast.error("Erro ao desconectar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (configuracao.whatsappAtivo !== undefined) {
      setIsChecked(configuracao.whatsappAtivo);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function pegarQrCode() {
      try {
        await whatsappService.iniciarSessao();
        while (true) {
          if (!isMounted) {
            return;
          }
          const response = await whatsappService.pegarQrCode();
          let qrcode = response.data.QRCode;

          if (qrcode === "") {
            const retryResponse = await whatsappService.pegarQrCode();
            qrcode = retryResponse.data.QRCode;
          }

          if (qrcode === "") {
            setQrcode(null);
          }

          setQrcode(qrcode);

          await new Promise((resolve) => setTimeout(resolve, INTERVALO_MS));
        }
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.message === "Sem sessão") {
          setQrcode(null);
          setBuscarQrcode(false);
          setIsQrcodeExpirado(true);
        } else if (error.message === "Conectado") {
          setQrcode(null);
          setIsConectado(true);
          setBuscarQrcode(false);
          toast.success("Conectado com sucesso.");
        } else {
          toast.error("Erro ao buscar qrcode.");
        }
      }
    }

    if (buscarQrcode) {
      pegarQrCode();
    }
    return () => {
      isMounted = false;
    };
  }, [buscarQrcode]);

  useEffect(() => {
    let isMounted = true;
    async function verificarStatusSessao() {
      try {
        const sessao: sessaoWhatsappDTO =
          await whatsappService.verificarStatusSessao();
        if (sessao.data.loggedIn) {
          setIsConectado(true);
        } else {
          setBuscarQrcode(true);
        }
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.message === "Usuário não cadastrado") {
          try {
            await whatsappService.cadastrarWhatsapp();
          } catch (error: any) {
            setIsChecked(false);
            toast.error("Error ao ativar WhatsApp.");
          }
        } else {
          setIsChecked(false);
          toast.error("Error ao ativar WhatsApp.");
        }
      }
    }

    if (isChecked) {
      verificarStatusSessao();
    }

    return () => {
      isMounted = false;
    };
  }, [isChecked]);

  async function handleToggleWhatsapp(checked: boolean) {
    try {
      setIsSubmitting(true);

      configuracao.whatsappAtivo = checked;

      await empresaService.atualizarConfiguracao(configuracao);

      setIsChecked(checked);
      toast.success(
        `Notificações por WhatsApp ${
          checked ? "ativadas" : "desativadas"
        } com sucesso.`
      );
    } catch (err) {
      toast.error("Erro ao atualizar configuração.");
      setIsChecked(!checked);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    setBuscarQrcode,
    isQrcodeExpirado,
    qrcode,
    isConectado,
    isChecked,
    setIsChecked,
    isSubmitting,
    setIsSubmitting,
    handleToggleWhatsapp,
    handleDesconectar,
    handleGerarQrcodeNovamente,
  };
}
