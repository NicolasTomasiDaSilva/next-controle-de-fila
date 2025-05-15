import TabelaPrincipal from "@/components/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";

import filaData from "@/data/fila-data";
import { filaService } from "@/services/fila-service-server";
import { AdicionarClienteDialog } from "@/components/TabelaPrincipal/AdicionarClienteDialog";
import { FilaProvider } from "@/contexts/fila-context";
import { Fila } from "@/models/fila";

type FilaPageProps = {
  params: { filaId: string };
};

export default async function FilaPage({ params }: FilaPageProps) {
  const { filaId } = params;

  const fila: Fila = await filaService.obterFilaPorId(filaId);

  return (
    <Section title="Fila de Atendimento">
      <FilaProvider filaInicial={fila}>
        <AdicionarClienteDialog></AdicionarClienteDialog>
        <TabelaPrincipal></TabelaPrincipal>
      </FilaProvider>
    </Section>
  );
}
