// app/preview/page.tsx
"use client";

import { Monitor } from "@/components/pages/aparencia/monitor-mock/monitor";
import { useSearchParams } from "next/navigation";

export default function MonitorPreview() {
  const params = useSearchParams();
  const corPrimaria = params.get("corPrimaria") || "";
  const corSobreposicao = params.get("corSobreposicao") || "";
  const logoUrl = params.get("logoUrl");
  const nomeDisplay = params.get("nomeDisplay") || "";
  const enderecoDisplay = params.get("enderecoDisplay");

  const valores = {
    corPrimaria,
    corSobreposicao,
    logoUrl,
    nomeDisplay,
    enderecoDisplay,
  };

  return <Monitor valores={valores}></Monitor>;
}
