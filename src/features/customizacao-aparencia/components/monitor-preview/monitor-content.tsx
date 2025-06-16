"use client";

import { ConfiguracaoFormDTO } from "@/dtos/configuracao";
import ChamadoAtual from "./chamado-atual";

import Header from "./header";
import UltimosChamados from "./ultimos-chamados";

interface MonitorPreviewProps {
  configuracao: ConfiguracaoFormDTO;
}

export default function MonitorPreview({ configuracao }: MonitorPreviewProps) {
  return (
    <div
      className="w-full h-full"
      style={{ fontSize: "min(1vw, 1vh)" }} // Escala proporcional ao tamanho da tela
    >
      <div
        className="flex flex-col h-full"
        style={{
          backgroundColor: configuracao.corPrimaria,
          color: configuracao.corSobreposicao,
        }}
      >
        <Header configuracao={configuracao} />
        <div className="w-full flex flex-row flex-1 gap-[1.5em] py-[2em] px-[2em] pt-[1em]">
          <div className="w-1/2 overflow-hidden">
            <ChamadoAtual configuracao={configuracao} />
          </div>
          <div className="w-1/2 overflow-hidden">
            <UltimosChamados configuracao={configuracao} />
          </div>
        </div>
      </div>
    </div>
  );
}
