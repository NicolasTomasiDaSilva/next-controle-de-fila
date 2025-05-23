"use client";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

const DataHora = () => {
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDataHora(new Date()); // Atualiza o estado com a hora atual
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalo); // Limpa o intervalo quando o componente desmontar
  }, []);

  // Formatando a data e hora
  const dataFormatada = dataHora
    .toLocaleDateString("pt-BR", {
      weekday: "short", // Exibe o dia da semana
      day: "2-digit",
      month: "2-digit",
    })
    .replace(",", "") // Remove a vírgula
    .replace(/^\w+/, (match) => match.toUpperCase()); // Transforma só o dia da semana em maiúsculas

  const horaFormatada = dataHora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-center  sm:p-1 md:p-2 lg:p-3 xl:p-4 rounded-full bg-black/10">
      <Clock size={24} className="sm:size-4 md:size-6 lg:size-10 xl:size-12" />
      <div className="text-lg sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl  font-semibold">
        <span className="mr-3">{dataFormatada}</span>
        {horaFormatada}
      </div>
    </div>
  );
};

export default DataHora;
