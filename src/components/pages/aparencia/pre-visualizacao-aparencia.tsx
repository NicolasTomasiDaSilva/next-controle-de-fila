"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";
import { useDebounce } from "use-debounce";
import { UseFormReturn } from "react-hook-form";
import Simulador from "./simulador";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();

  const [debouncedValores] = useDebounce(valores, 300);

  const params = new URLSearchParams();

  params.set("nomeDisplay", debouncedValores.nomeDisplay);
  params.set("corPrimaria", debouncedValores.corPrimaria);
  params.set("corSobreposicao", debouncedValores.corSobreposicao);
  if (debouncedValores.enderecoDisplay) {
    params.set("enderecoDisplay", debouncedValores.enderecoDisplay);
  }
  if (debouncedValores.logoUrl) {
    params.set("logoUrl", debouncedValores.logoUrl);
  }

  return (
    <Simulador
      scale={0.25}
      width={1920}
      height={1080}
      url={`/preview/monitor?${params.toString()}`}
    ></Simulador>
  );
}
