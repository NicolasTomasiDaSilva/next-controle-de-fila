import { Clock, Timer } from "lucide-react";
import { CardTempo } from "./card-tempo";
import { ConfiguracaoFormDTO } from "@/dtos/configuracao";

interface CardPosicaoProps {
  valores: ConfiguracaoFormDTO;
}

export const CardPosicao = ({ valores }: CardPosicaoProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-md">
      <>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold  items-center gap-2">
            Sua posição na fila
          </h2>

          <h1
            className="text-8xl font-bold my-4"
            style={{
              color: valores?.corPrimaria ?? "#000000",
            }}
          >
            8
          </h1>

          <p className="text-sm text-gray-500 mb-2">Atualizado em tempo real</p>
        </div>

        <div className="mt-6 space-y-4">
          <CardTempo
            icon={
              <Clock
                size={20}
                style={{ color: valores?.corPrimaria ?? "#000000" }}
              />
            }
            titulo="Tempo já aguardado"
            subtitulo="Desde sua entrada na fila"
            valor={"4 min"}
          />

          <CardTempo
            icon={
              <Timer
                size={20}
                style={{ color: valores?.corPrimaria ?? "#000000" }}
              />
            }
            titulo="Tempo médio de espera"
            subtitulo="Baseado no fluxo da fila"
            valor={"7 min"}
          />
        </div>
      </>
    </div>
  );
};
