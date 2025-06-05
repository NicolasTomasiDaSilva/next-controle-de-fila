import { mensagensFormDTO } from "@/dtos/configuracao";
import { whatsappToHtml } from "@/utils/token-transform";
import { UseFormReturn } from "react-hook-form";

export default function usePreVisualizacaoMensagens(
  form: UseFormReturn<mensagensFormDTO>
) {
  let mensagemEntrada = form.watch("mensagemEntrada") ?? "";
  let mensagemChamada = form.watch("mensagemChamada") ?? "";
  let mensagemRemovido = form.watch("mensagemRemovido") ?? "";

  mensagemEntrada = mensagemEntrada.replace(/{nome}/g, "João da Silva");
  mensagemEntrada = mensagemEntrada.replace(/{link}/g, "https://example.com");
  const htmlMensagemEntrada = whatsappToHtml(mensagemEntrada);

  mensagemChamada = mensagemChamada.replace(/{nome}/g, "João da Silva");
  mensagemChamada = mensagemChamada.replace(/{link}/g, "https://example.com");
  const htmlMensagemChamada = whatsappToHtml(mensagemChamada);

  mensagemRemovido = mensagemRemovido.replace(/{nome}/g, "João da Silva");
  mensagemRemovido = mensagemRemovido.replace(/{link}/g, "https://example.com");
  const htmlMensagemRemovido = whatsappToHtml(mensagemRemovido);

  return { htmlMensagemEntrada, htmlMensagemChamada, htmlMensagemRemovido };
}
