import { Section } from "@/features/shared/components/section";
import ConfiguracoesContent from "@/features/configuracoes/components/configuracoes-content";
import EstatisticasContent from "@/features/estatisticas/components/estatisticas-content";
import { Empresa } from "@/features/shared/models/empresa";
import { empresaService } from "@/features/shared/services/empresa-service";
import { EstatisticasFilaDTO } from "@/features/estatisticas/models/estatisticas-fila";
import { estatisticasService } from "@/features/estatisticas/service/estatisticas-service";
export const dynamic = "force-dynamic";
export default async function EstatisticasPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();
  const filaId = empresa.filas[0].id;
  const estatisticasFila: EstatisticasFilaDTO =
    await estatisticasService.obterEstatisticasFilaPorId(filaId);
  return (
    <Section title="Estatísticas" linkRetorno={"/configuracoes"} cor="indigo">
      <EstatisticasContent estatisticasFila={estatisticasFila} />
    </Section>
  );
}
