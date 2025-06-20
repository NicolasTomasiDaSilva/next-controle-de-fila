import { StatusEnum } from "@/lib/enums/status-enum";
import CardNumeroClientes from "./card-numero-clientes";
import {
  UserCheck,
  UserRoundCheck,
  UserRoundMinus,
  UserRoundSearch,
  UserRoundX,
  UserSearch,
} from "lucide-react";
import CardDistribuicaoStatus from "./card-distribuicao-status";
import CardTempoMedioEspera from "./card-tempo-medio-espera";
import { EstatisticasFilaDTO } from "../models/estatisticas-fila";

interface EstatisticasContentProps {
  estatisticasFila: EstatisticasFilaDTO;
}

export default function EstatisticasContent({
  estatisticasFila,
}: EstatisticasContentProps) {
  const totalClientesRecentes =
    estatisticasFila.quantidadeClientesChamados +
    estatisticasFila.quantidadeClientesDesistentes +
    estatisticasFila.quantidadeClientesAusentes +
    estatisticasFila.quantidadeClientesRemovidos;

  const porcentagemChamados =
    (estatisticasFila.quantidadeClientesChamados * 100) / totalClientesRecentes;
  const porcentagemDesistentes =
    (estatisticasFila.quantidadeClientesDesistentes * 100) /
    totalClientesRecentes;
  const porcentagemAusentes =
    (estatisticasFila.quantidadeClientesAusentes * 100) / totalClientesRecentes;
  const porcentagemRemovidos =
    (estatisticasFila.quantidadeClientesRemovidos * 100) /
    totalClientesRecentes;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4  md:grid md:grid-cols-2 xl:grid-cols-4 ">
        <CardNumeroClientes
          icone={(className) => (
            <UserRoundCheck className={className}></UserRoundCheck>
          )}
          titulo="Chamados"
          quantidade={estatisticasFila.quantidadeClientesChamados}
          portcentagem={porcentagemChamados}
          status={StatusEnum.Chamado}
        />
        <CardNumeroClientes
          icone={(className) => (
            <UserRoundMinus className={className}></UserRoundMinus>
          )}
          titulo="Desistentes"
          quantidade={estatisticasFila.quantidadeClientesDesistentes}
          portcentagem={porcentagemDesistentes}
          status={StatusEnum.Desistente}
        />
        <CardNumeroClientes
          icone={(className) => (
            <UserRoundSearch className={className}></UserRoundSearch>
          )}
          titulo="Não Compareceram"
          quantidade={estatisticasFila.quantidadeClientesAusentes}
          portcentagem={porcentagemAusentes}
          status={StatusEnum.Ausente}
        />
        <CardNumeroClientes
          icone={(className) => <UserRoundX className={className}></UserRoundX>}
          titulo="Removidos"
          quantidade={estatisticasFila.quantidadeClientesRemovidos}
          portcentagem={porcentagemRemovidos}
          status={StatusEnum.Removido}
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row items-start">
        <CardDistribuicaoStatus estatisticasFila={estatisticasFila} />
        <CardTempoMedioEspera estatisticas={estatisticasFila} />
      </div>
    </div>
  );
}
