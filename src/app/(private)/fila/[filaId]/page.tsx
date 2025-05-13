import TabelaPrincipal from "@/components/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTittle";
import filaData from "@/data/fila-data";
import { filaService } from "@/services/fila-service";

type FilaPageProps = {
  params: { filaId: string };
};

export default async function FilaPage({ params }: FilaPageProps) {
  const { filaId } = params;
  const clientes = filaData.clientes;

  try {
    const fila = await filaService.obterFilaPorId(filaId);
  } catch (error) {
    console.error("Erro ao carregar fila:", error);
    // Opcional: você pode retornar uma mensagem de erro ou redirecionar
  }

  return (
    <Section title="Fila de Atendimento">
      <TabelaPrincipal clientes={clientes}></TabelaPrincipal>
    </Section>
  );
}
