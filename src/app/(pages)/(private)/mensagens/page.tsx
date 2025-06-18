import { Section } from "@/features/shared/components/section";
import { empresaService } from "@/features/shared/services/empresa-service";
import { Empresa } from "@/features/shared/models/empresa";
import { EmpresaProvider } from "@/features/shared/contexts/empresa-context";
import MensagensContent from "@/features/customizacao-mensagens/components/mensagens-content";
export const dynamic = "force-dynamic";
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
