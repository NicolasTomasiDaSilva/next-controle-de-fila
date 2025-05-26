import { Section } from "@/components/Section";
import { empresaService } from "@/services/empresa-service";
import { Empresa } from "@/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";

import VinculacaoContent from "@/components/pages/vinculacao/vinculacao-content";

export default async function VinculacaoPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section title="Vinculação Monitor">
        <VinculacaoContent></VinculacaoContent>
      </Section>
    </EmpresaProvider>
  );
}
