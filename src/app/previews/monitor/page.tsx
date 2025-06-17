"use client";

import AppClientePreview from "@/features/customizacao-aparencia/components/app-cliente-preview/app-cliente-content";
import MonitorPreview from "@/features/customizacao-aparencia/components/monitor-preview/monitor-content";
import { Monitor } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AppClientePreviewPage() {
  const params = useSearchParams();
  const corPrimaria = params.get("corPrimaria") || "";
  const corSobreposicao = params.get("corSobreposicao") || "";
  const logoUrl = params.get("logoUrl");
  const nomeDisplay = params.get("nomeDisplay") || "";
  const enderecoDisplay = params.get("enderecoDisplay");

  const configuracao = {
    corPrimaria: corPrimaria,
    corSobreposicao: corSobreposicao,
    logoUrl: logoUrl,
    nomeDisplay: nomeDisplay,
    enderecoDisplay: enderecoDisplay,
  };

  return <MonitorPreview configuracao={configuracao}></MonitorPreview>;
}
