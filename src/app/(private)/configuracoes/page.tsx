import TabelaPrincipal from "@/components/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";
import { filaService } from "@/services/fila-service-server";
import { AdicionarClienteDialog } from "@/components/TabelaPrincipal/AdicionarClienteDialog";
import { FilaProvider } from "@/contexts/fila-context";
import { Fila } from "@/models/fila";
import TabelaRecentes from "@/components/TabelaRecentes/TabelaRecentes";
import { empresaService } from "@/services/empresa-service-server";
import { Empresa } from "@/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";
import { ConfiguracaoCard } from "@/components/ConfiguracaoCard";
import { Palette } from "lucide-react";

export default async function FilaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section title="Configurações">
        <div className="grid grid-cols-2 gap-3">
          <ConfiguracaoCard
            icone={() => {
              return <Palette />;
            }}
            titulo="Customizar aparência"
            className="col-span-2 sm:col-span-1"
            cor="red"
          />
        </div>
      </Section>
    </EmpresaProvider>
  );
}
