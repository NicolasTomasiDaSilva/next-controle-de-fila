import { Section } from "@/components/Section";
import { empresaService } from "@/services/empresa-service";
import { Empresa } from "@/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";

import VinculacaoContent from "@/components/pages/vinculacao/vinculacao-content";
import MensagensContent from "@/components/pages/mensagens/mensagens-content";

export default async function MensagensPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section
        title="Customização Mensagens"
        linkRetorno={"/configuracoes"}
        cor="purple"
      >
        <MensagensContent></MensagensContent>
      </Section>
    </EmpresaProvider>
  );
}
