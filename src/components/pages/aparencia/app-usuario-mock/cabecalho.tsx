import { configuracaoFormDTO } from "@/dtos/configuracao";

import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CabecalhoProps {
  valores: configuracaoFormDTO;
}

const Cabecalho = ({ valores }: CabecalhoProps) => {
  const logoSize = {
    mobile: 64,
    desktop: 80,
  };

  return (
    <header className="flex flex-col items-center mb-6 w-full">
      {/* Logo Responsivo */}
      <div
        className="relative"
        style={{
          width: logoSize.mobile,
          height: logoSize.mobile,
        }}
      >
        {valores.logoUrl && (
          <Image
            src={valores.logoUrl || "/logoRestaurante.png"}
            alt={`Logo ${valores.logoUrl}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 80px"
            priority
          />
        )}
      </div>

      {/* Nome do Estabelecimento */}
      <h1 className="text-2xl font-semibold mt-3 text-center">
        {valores.nomeDisplay}
      </h1>

      {/* Endereço com Ícone */}
      {valores.enderecoDisplay?.trim() && (
        <div className="flex items-center mt-1 font-black">
          <MapPin size={18} className="mr-1" aria-hidden="true" />
          <span className="text-sm md:text-base font-semibold">
            {valores.enderecoDisplay}
          </span>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
