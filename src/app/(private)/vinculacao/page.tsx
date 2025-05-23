import TabelaPrincipal from "@/components/pages/fila/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";

import filaData from "@/data/fila-data";
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

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section title="Vincular Monitor"></Section>
    </EmpresaProvider>
  );
}
