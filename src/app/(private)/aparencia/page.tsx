import { Section } from "@/features/shared/components/section";
import { EmpresaProvider } from "@/contexts/empresa-context";
import { Empresa } from "@/models/empresa";
import { empresaService } from "@/services/empresa-service";
import { AparenciaContent } from "@/features/customizacao-aparencia/components/aparencia-content";

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
