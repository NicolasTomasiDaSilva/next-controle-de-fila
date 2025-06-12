import Image from "next/image";
import { ConfiguracaoFormDTO } from "@/dtos/configuracao";
import DataHora from "./data-hora";

interface CabecalhoProps {
  valores: ConfiguracaoFormDTO;
}

const Cabecalho = ({ valores }: CabecalhoProps) => {
  return (
    <div
      className="relative flex justify-between items-center  bg-gradient-to-b from-gradiente to bg-primaria text-sobreposicao   px-4 md:px-10 lg:px-20 h-[15vh]"
      style={{
        backgroundColor: valores.corPrimaria ?? "#ffffff",
        color: valores.corSobreposicao ?? "#000000",
      }}
    >
      <div className="flex items-center gap-5 md:gap-10 lg:gap-20">
        {valores.logoUrl && (
          <Image
            src={valores.logoUrl}
            width={50}
            height={50}
            alt={`Logo - ${valores.logoUrl} `}
            className="w-15 sm:w-10 md:w-15 lg:w-15 xl:w-30"
          />
        )}

        {/* Nome da Empresa */}
        <h1 className="hidden sm:block text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-6xl font-bold uppercase">
          {valores.nomeDisplay}
        </h1>
      </div>

      <DataHora />
    </div>
  );
};

export default Cabecalho;
