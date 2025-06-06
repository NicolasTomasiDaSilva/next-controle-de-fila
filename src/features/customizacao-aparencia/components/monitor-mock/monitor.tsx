import { configuracaoFormDTO } from "@/dtos/configuracao";

import { UseFormReturn } from "react-hook-form";
import Cabecalho from "./cabecalho";
import CardSenhaAtual from "./card-senha-atual";
import CardUltimosChamados from "./card-ultimos-chamados";

interface MonitorProps {
  valores: configuracaoFormDTO;
}

export const Monitor = ({ valores }: MonitorProps) => {
  return (
    <div className="w-full h-full">
      <Cabecalho valores={valores} />
      <div className="flex flex-row">
        <CardSenhaAtual valores={valores} />
        <CardUltimosChamados valores={valores} />
      </div>
    </div>
  );
};
