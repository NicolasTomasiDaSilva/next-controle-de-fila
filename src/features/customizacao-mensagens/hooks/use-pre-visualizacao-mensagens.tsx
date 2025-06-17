import { MensagensFormDTO } from "@/dtos/configuracao";

import { UseFormReturn } from "react-hook-form";
import { format } from "@flasd/whatsapp-formatting";

export default function usePreVisualizacaoMensagens(
  form: UseFormReturn<MensagensFormDTO>
) {
  let mensagemEntrada = form.watch("mensagemEntrada") ?? "";
  let mensagemChamada = form.watch("mensagemChamada") ?? "";
  let mensagemRemovido = form.watch("mensagemRemovido") ?? "";

  mensagemEntrada = mensagemEntrada.replace(/{nome}/g, "João da Silva");
  mensagemEntrada = mensagemEntrada.replace(/{link}/g, "https://example.com");
  const htmlMensagemEntrada = format(mensagemEntrada);

  mensagemChamada = mensagemChamada.replace(/{nome}/g, "João da Silva");
  mensagemChamada = mensagemChamada.replace(/{link}/g, "https://example.com");
  const htmlMensagemChamada = format(mensagemChamada);

  mensagemRemovido = mensagemRemovido.replace(/{nome}/g, "João da Silva");
  mensagemRemovido = mensagemRemovido.replace(/{link}/g, "https://example.com");
  const htmlMensagemRemovido = format(mensagemRemovido);

  return { htmlMensagemEntrada, htmlMensagemChamada, htmlMensagemRemovido };
}
