import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { EstatisticasFilaDTO } from "../models/estatisticas-fila";
import { formatarIntervaloTempoEmMinutos } from "@/lib/utils/data-hora-utils";

interface CardTempoMedioEsperaProps {
  estatisticas: EstatisticasFilaDTO;
}

export default function CardTempoMedioEspera({
  estatisticas,
}: CardTempoMedioEsperaProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="mr-2 inline" />
          Tempo de Espera
        </CardTitle>
        <CardDescription>Tempos de espera para atendimento</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold">Tempo Médio:</p>
          <p className="text-lg font-bold whitespace-nowrap">
            {formatarIntervaloTempoEmMinutos(estatisticas.tempoMedioEspera)} min
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold">Tempo Mínimo:</p>
          <p className="text-lg font-bold whitespace-nowrap">
            {formatarIntervaloTempoEmMinutos(estatisticas.tempoMinimoEspera)}{" "}
            min
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold">Tempo Máximo:</p>
          <p className="text-lg font-bold whitespace-nowrap">
            {formatarIntervaloTempoEmMinutos(estatisticas.tempoMaximoEspera)}{" "}
            min
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
