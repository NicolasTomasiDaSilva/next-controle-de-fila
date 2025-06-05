import { Section } from "@/features/shared/components/section";
import { filaService } from "@/services/fila-service";
import { FilaProvider } from "@/contexts/fila-context";
import { Fila } from "@/features/fila/models/fila";
import { empresaService } from "@/services/empresa-service";
import { Empresa } from "@/features/shared/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";
import FilaContent from "@/features/fila/components/fila-content";
export const dynamic = "force-dynamic";
export default async function FilaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();
  const filaId = empresa.filas[0].id;
  const fila: Fila = await filaService.obterFilaPorId(filaId);

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <FilaProvider filaInicial={fila}>
        <Section title="Fila de Atendimento">
          <FilaContent></FilaContent>
        </Section>
      </FilaProvider>
    </EmpresaProvider>
  );
}
