import { Section } from "@/features/shared/components/section";
import ConfiguracoesContent from "@/features/configuracoes/components/configuracoes-content";
import EstatisticasContent from "@/features/estatisticas/estatisticas-content";
export const dynamic = "force-dynamic";
export default async function EstatisticasPage() {
  return (
    <Section title="Estatísticas" linkRetorno={"/configuracoes"} cor="indigo">
      <EstatisticasContent />
    </Section>
  );
}
