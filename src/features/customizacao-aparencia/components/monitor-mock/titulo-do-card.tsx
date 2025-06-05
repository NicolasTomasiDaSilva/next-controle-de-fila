import { ReactNode } from "react";

interface TituloCardProps {
  icone: ReactNode;
  texto: string;
  cor?: string;
}

export function TituloCard({ icone, texto, cor = "#00000" }: TituloCardProps) {
  return (
    <div
      className="flex flex-row justify-center items-center gap-3 w-[50vw] h-[10vh] pt-10 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-texto drop-shadow-md  font-semibold"
      style={{ color: cor }}
    >
      {icone}
      <h1>{texto} </h1>
    </div>
  );
}
