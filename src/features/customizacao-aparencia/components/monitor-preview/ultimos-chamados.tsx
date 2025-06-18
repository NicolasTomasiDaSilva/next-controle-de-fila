"use client";
import { Card } from "@/components/ui/card";

import { ArrowRight, CircleCheck, Ticket } from "lucide-react";
import React, { useMemo, useState } from "react";
import { lightenColor } from "@/lib/utils/color-utils";
import { AparenciaFormDTO } from "@/dtos/configuracao";

interface UltimosChamadosProps {
  configuracao: AparenciaFormDTO;
}

export default function UltimosChamados({
  configuracao,
}: UltimosChamadosProps) {
  return (
    <div className=" h-full w-full flex flex-col  justify-center items-center ">
      <div className="flex flex-row items-center gap-[1em] mb-[1em]">
        <CircleCheck className="h-[2em] w-[2em] icon-shadow" />
        <p
          className="text-[1.5em]
      font-extrabold whitespace-nowrap text-shadow
 "
        >
          ÚLTIMOS CHAMADOS
        </p>
      </div>

      <Card
        className="flex-1 w-full rounded-[1.5em]  border-none items-start justify-evenly px-[1em] text-inherit gap-0 space-y-0  py-0 shadow-none shadow-[0_0_10px_rgba(0,0,0,0.1)] "
        style={{
          backgroundColor: lightenColor(configuracao.corPrimaria, 5),
        }}
      >
        <div className="w-full flex-1 flex flex-col items-center justify-center border-b-1 border-white/30 last:border-0">
          <div className="w-full flex flex-row items-center  gap-[1em] px-[2em]  py-[2em)]">
            <p className="font-bold text-[2.5em] text-shadow ">16:09</p>
            <ArrowRight
              className="h-[1.5em] w-[1.5em] icon-shadow"
              style={{ color: configuracao.corSobreposicao }}
            />
            <p className="text-[2.5em] font-semibold line-clamp-2  leading-none text-shadow">
              NICOLAS TOMASI DA SILVA
            </p>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col items-center justify-center border-b-1 border-white/30 last:border-0">
          <div className="w-full flex flex-row items-center  gap-[1em] px-[2em]  py-[2em)]">
            <p className="font-bold text-[2.5em] text-shadow ">16:06</p>
            <ArrowRight
              className="h-[1.5em] w-[1.5em] icon-shadow"
              style={{ color: configuracao.corSobreposicao }}
            />
            <p className="text-[2.5em] font-semibold line-clamp-2  leading-none text-shadow">
              NICOLAS TOMASI DA SILVA
            </p>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col items-center justify-center border-b-1 border-white/30 last:border-0">
          <div className="w-full flex flex-row items-center  gap-[1em] px-[2em]  py-[2em)]">
            <p className="font-bold text-[2.5em] text-shadow ">16:05</p>
            <ArrowRight
              className="h-[1.5em] w-[1.5em] icon-shadow"
              style={{ color: configuracao.corSobreposicao }}
            />
            <p className="text-[2.5em] font-semibold line-clamp-2  leading-none text-shadow">
              NICOLAS TOMASI DA SILVA
            </p>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col items-center justify-center border-b-1 border-white/30 last:border-0">
          <div className="w-full flex flex-row items-center  gap-[1em] px-[2em]  py-[2em)]">
            <p className="font-bold text-[2.5em] text-shadow ">16:03</p>
            <ArrowRight
              className="h-[1.5em] w-[1.5em] icon-shadow"
              style={{ color: configuracao.corSobreposicao }}
            />
            <p className="text-[2.5em] font-semibold line-clamp-2  leading-none text-shadow">
              NICOLAS TOMASI DA SILVA
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
