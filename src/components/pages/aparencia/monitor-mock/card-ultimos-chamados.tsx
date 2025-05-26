"use client";

import { CircleCheck, ArrowRight } from "lucide-react";

import dayjs from "dayjs";

import { TituloCard } from "./titulo-do-card";
import { configuracaoFormDTO } from "@/dtos/configuracao";
interface CardUltimosChamadosProps {
  valores: configuracaoFormDTO;
}

const CardUltimosChamados = ({ valores }: CardUltimosChamadosProps) => {
  return (
    <div
      className="w-[50vw] h-[calc(100vh-15vh)] bg-primary flex flex-col items-center"
      style={{
        backgroundColor: valores.corPrimaria ?? "#ffffff",
      }}
    >
      <TituloCard
        icone={
          <CircleCheck className="sm:size-5 md:size-6 lg:size-7 xl:size-12" />
        }
        texto="ÚLTIMOS CHAMADOS"
        cor={valores.corSobreposicao}
      />

      <div className="flex flex-col justify-star items-center h-[80%] w-[90%] m-auto bg-transparente rounded-2xl drop-shadow-xl overflow-hidden">
        <div className="h-[25%] w-[100%] flex flex-row items-center justify-around py-2 sm:px-1 md:px-2 lg:px-5 xl:px-10 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-15 border-b border-b-texto/30 last:border-b-0 font-bold">
          <h1
            className=" sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-texto"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          >
            17:59
          </h1>
          <ArrowRight
            className="text-texto/50 sm:size-5 md:size-5 lg:size-7 xl:size-12"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          />
          <h1
            className="sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-texto mr-auto uppercase"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          >
            Nicolas Tomasi da Sivla
          </h1>
        </div>
        <div className="h-[25%] w-[100%] flex flex-row items-center justify-around py-2 sm:px-1 md:px-2 lg:px-5 xl:px-10 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-15 border-b border-b-texto/30 last:border-b-0 font-bold">
          <h1
            className=" sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-texto"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          >
            17:59
          </h1>
          <ArrowRight
            className="text-texto/50 sm:size-5 md:size-5 lg:size-7 xl:size-12"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          />
          <h1
            className="sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-texto mr-auto uppercase"
            style={{
              color: valores?.corSobreposicao ?? "#000000",
            }}
          >
            Nicolas Tomasi da Sivla
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CardUltimosChamados;
