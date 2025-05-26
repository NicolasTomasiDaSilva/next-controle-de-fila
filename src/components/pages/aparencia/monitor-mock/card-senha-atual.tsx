"use client";
import { Ticket } from "lucide-react";
import { configuracaoFormDTO } from "@/dtos/configuracao";
import { TituloCard } from "./titulo-do-card";

interface CardSenhaAtualProps {
  valores: configuracaoFormDTO;
}

const CardSenhaAtual = ({ valores }: CardSenhaAtualProps) => {
  return (
    <div
      className="w-[50vw] h-[calc(100vh-15vh)] bg-primary flex flex-col items-center"
      style={{
        backgroundColor: valores.corPrimaria ?? "#ffffff",
      }}
    >
      <TituloCard
        icone={<Ticket className="sm:size-5 md:size-6 lg:size-7 xl:size-12" />}
        texto="CHAMADO ATUAL"
        cor={valores.corSobreposicao}
      />

      <div className="flex flex-col justify-center items-center gap-10 h-[80%] w-[90%] m-auto bg-white rounded-2xl drop-shadow-xl">
        <div className="flex flex-col justify-center items-center h-[100%] w-[80%]">
          <h1 className="sm:text-xl md:text-6xl lg:text-8xl xl:text-9xl text-center font-bold uppercase">
            Lucas Almeida Pereira
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CardSenhaAtual;
