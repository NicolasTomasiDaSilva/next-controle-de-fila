import { Section } from "@/components/Section";
import { AparenciaContent } from "@/components/pages/aparencia/aparencia-content";
import { ConfiguracaoDados } from "@/components/pages/aparencia/configuracao-dados";
import { ConfiguracaoCard } from "@/components/pages/configuracoes/ConfiguracaoCard";

import { EmpresaProvider } from "@/contexts/empresa-context";
import { Empresa } from "@/models/empresa";
import { empresaService } from "@/services/empresa-service";
import { MessageCircle, MessageSquare, Monitor, Palette } from "lucide-react";

export default async function AparenciaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();
  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section
        title="Customização Aparência"
        linkRetorno={"/configuracoes"}
        cor="red"
      >
        <AparenciaContent empresa={empresa}></AparenciaContent>
      </Section>
    </EmpresaProvider>
  );
}
