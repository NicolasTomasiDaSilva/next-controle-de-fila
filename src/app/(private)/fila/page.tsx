import TabelaPrincipal from "@/components/pages/fila/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";

import { filaService } from "@/services/fila-service";
import { AdicionarClienteDialog } from "@/components/pages/fila/TabelaPrincipal/AdicionarClienteDialog";
import { FilaProvider } from "@/contexts/fila-context";
import { Fila } from "@/models/fila";
import TabelaRecentes from "@/components/pages/fila/TabelaRecentes/TabelaRecentes";
import { empresaService } from "@/services/empresa-service";
import { Empresa } from "@/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";

export default async function FilaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();
  const filaId = empresa.filas[0].id;
  const fila: Fila = await filaService.obterFilaPorId(filaId);

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <FilaProvider filaInicial={fila}>
        <Section title="Fila de Atendimento">
          <AdicionarClienteDialog></AdicionarClienteDialog>
          <div className="h-2"></div>
          <TabelaPrincipal></TabelaPrincipal>
          <div className="h-10"></div>
          <TabelaRecentes></TabelaRecentes>
        </Section>
      </FilaProvider>
    </EmpresaProvider>
  );
}
