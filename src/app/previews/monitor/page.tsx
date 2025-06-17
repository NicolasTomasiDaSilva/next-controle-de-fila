import AppClientePreview from "@/features/customizacao-aparencia/components/app-cliente-preview/app-cliente-content";
import MonitorPreview from "@/features/customizacao-aparencia/components/monitor-preview/monitor-content";
import { Monitor } from "lucide-react";

export default async function AppClientePreviewPage() {
  return (
    <MonitorPreview
      configuracao={{
        corPrimaria: "#000000",
        corSobreposicao: "#ffffff",
        nomeDisplay: "Nome Fantasia",
        enderecoDisplay: "Endereço",
        logoUrl: null,
      }}
    ></MonitorPreview>
  );
}
