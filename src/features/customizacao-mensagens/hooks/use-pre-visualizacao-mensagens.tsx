import { UseFormReturn } from "react-hook-form";
import { MensagensFormDTO } from "../models/mensagens-form-dto";

export default function usePreVisualizacaoMensagens(
  form: UseFormReturn<MensagensFormDTO>
) {
  let mensagemEntrada = form.watch("mensagemEntrada") ?? "";
  let mensagemChamada = form.watch("mensagemChamada") ?? "";
  let mensagemRemovido = form.watch("mensagemRemovido") ?? "";

  mensagemEntrada = mensagemEntrada.replace(/{nome}/g, "João da Silva");
  mensagemEntrada = mensagemEntrada.replace(/{link}/g, "https://example.com");

  mensagemChamada = mensagemChamada.replace(/{nome}/g, "João da Silva");
  mensagemChamada = mensagemChamada.replace(/{link}/g, "https://example.com");

  mensagemRemovido = mensagemRemovido.replace(/{nome}/g, "João da Silva");
  mensagemRemovido = mensagemRemovido.replace(/{link}/g, "https://example.com");

  return { mensagemEntrada, mensagemChamada, mensagemRemovido };
}
