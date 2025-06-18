import { Section } from "@/features/shared/components/section";
import { empresaService } from "@/features/shared/services/empresa-service";

import { EmpresaProvider } from "@/features/shared/contexts/empresa-context";
import WhatsAppContent from "@/features/vinculacao-whatsapp/components/whatsapp-content";
import { Empresa } from "@/features/shared/models/empresa";

export const dynamic = "force-dynamic";

export default async function VinculacaoPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section
        title="Vinculação WhatsApp"
        linkRetorno={"/configuracoes"}
        cor="green"
      >
        <WhatsAppContent />
      </Section>
    </EmpresaProvider>
  );
}
