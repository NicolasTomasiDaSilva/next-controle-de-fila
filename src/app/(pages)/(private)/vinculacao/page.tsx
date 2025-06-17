import { Section } from "@/features/shared/components/section";
import { empresaService } from "@/features/shared/services/empresa-service";
import { Empresa } from "@/features/shared/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";
import VinculacaoContent from "@/features/vinculacao-monitor/components/vinculacao-content";
export const dynamic = "force-dynamic";
export default async function VinculacaoPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section
        title="Vinculação Monitor"
        linkRetorno={"/configuracoes"}
        cor="cyan"
      >
        <VinculacaoContent></VinculacaoContent>
      </Section>
    </EmpresaProvider>
  );
}
