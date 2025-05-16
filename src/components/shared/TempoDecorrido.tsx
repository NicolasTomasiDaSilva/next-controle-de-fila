"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TempoDecorridoProps {
  data: Date;
}

export function TempoDecorrido({ data }: TempoDecorridoProps) {
  const [texto, setTexto] = useState<string>("");

  useEffect(() => {
    function atualizarTempo() {
      const tempo = formatDistanceToNowStrict(data, {
        unit: "minute",
        locale: ptBR,
      })
        .replace(" minutos", " min")
        .replace(" minuto", " min");

      setTexto(tempo);
    }

    atualizarTempo();

    const interval = setInterval(atualizarTempo, 30_000);

    return () => clearInterval(interval);
  }, [data]);

  return <>{texto}</>;
}
