// app/preview/page.tsx
"use client";
import { AppUsuario } from "@/components/pages/aparencia/app-usuario-mock/app-usuario";
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

  return <AppUsuario valores={valores}></AppUsuario>;
}
