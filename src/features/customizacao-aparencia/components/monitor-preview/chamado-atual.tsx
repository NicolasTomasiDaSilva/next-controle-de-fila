"use client";
import { Card } from "@/components/ui/card";
import { AparenciaFormDTO } from "@/dtos/configuracao";
import { Ticket } from "lucide-react";

interface ChamadoAtualProps {
  configuracao: AparenciaFormDTO;
}
export default function ChamadoAtual({ configuracao }: ChamadoAtualProps) {
  return (
    <div className="h-full w-full flex flex-col  justify-center items-center ">
      <div className="flex flex-row items-center gap-[1em] mb-[1em]">
        <Ticket className="h-[2em] w-[2em] icon-shadow" />
        <p
          className="text-[1.5em]
      font-extrabold whitespace-nowrap text-shadow"
        >
          CHAMADO ATUAL
        </p>
      </div>

      <Card className="flex-1 w-full rounded-[1.5em] flex flex-col justify-center items-center  shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none p-[3em] ">
        <p
          className="text-[5em]
      font-extrabold text-center leading-snug text-shadow break-words 
    "
        >
          NICOLAS TOMASI DA SILVA
        </p>
      </Card>
    </div>
  );
}
