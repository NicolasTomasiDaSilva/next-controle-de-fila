import { Section } from "@/features/shared/components/section";
import ConfiguracoesContent from "@/features/configuracoes/components/configuracoes-content";
export const dynamic = "force-dynamic";
export default async function ConfiguracaoPage() {
  return (
    <Section title="Configurações">
      <ConfiguracoesContent></ConfiguracoesContent>
    </Section>
  );
}
