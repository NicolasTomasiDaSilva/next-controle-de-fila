import { Section } from "@/features/shared/components/section";
import { EmpresaProvider } from "@/features/shared/contexts/empresa-context";

import { empresaService } from "@/features/shared/services/empresa-service";
import { AparenciaContent } from "@/features/customizacao-aparencia/components/aparencia-content";
import { Empresa } from "@/features/shared/models/empresa";
export const dynamic = "force-dynamic";
export default async function AparenciaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();
  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section
        title="Customização Aparência"
        linkRetorno={"/configuracoes"}
        cor="red"
      >
        <AparenciaContent></AparenciaContent>
      </Section>
    </EmpresaProvider>
  );
}
