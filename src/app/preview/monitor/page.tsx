"use client";

import { Monitor } from "@/features/customizacao-aparencia/components/monitor-mock/monitor";
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

  return (
    <div className="overflow-hidden">
      <Monitor valores={valores}></Monitor>
    </div>
  );
}
