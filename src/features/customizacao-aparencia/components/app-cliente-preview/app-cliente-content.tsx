"use client";
import { Card } from "@/components/ui/card";

import { Clock, LogOut, MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";
import { AparenciaFormDTO } from "../../models/aparencia-form-dto";

interface AppClientePreviewProps {
  configuracao: AparenciaFormDTO;
}

export default function AppClientePreview({
  configuracao,
}: AppClientePreviewProps) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center overflow-y-hidden"
      style={{
        fontSize: "min(0.85vh, 1.5vw)",
        backgroundImage: "none",
        background: `linear-gradient(to bottom, ${configuracao.corPrimaria} 0%, white 100%)`,
      }}
    >
      <div className="flex  flex-col justify-center items-center gap-[1.5em]  p-[2em] max-w-[75em]">
        <Card className="px-[2em] w-full">
          <div className="flex flex-col items-center gap-[1em]">
            <p className="text-[3em]  font-extrabold leading-none  text-center line-clamp-2">
              {configuracao.nomeDisplay}
            </p>
            {configuracao.logoUrl && (
              <Image
                src={configuracao.logoUrl}
                width={100}
                height={100}
                alt="Logo"
                className="rounded-md object-cover w-[10em] h-[10em]"
                priority
              />
            )}

            <p className="text-[2em]  leading-none  text-center max-w-full ">
              <MapPin className="!h-[1em] !w-[1em] inline" />{" "}
              {configuracao.enderecoDisplay}
            </p>
          </div>
          <div className="flex flex-col gap-[2.5em] h-[25em] justify-between ">
            <>
              <p className="text-[2em] text-center font-bold">
                Sua posição na fila
              </p>

              <div
                className={`font-(family-name:--font-geist-sans) text-[15em] text-center font-extrabold leading-none`}
                style={{
                  color: configuracao.corPrimaria,
                }}
              >
                7
              </div>

              <p className="text-[1.5em] text-center text-muted-foreground">
                Atualizado em tempo real
              </p>
            </>
          </div>

          <div className="flex flex-col gap-[2em]">
            <Card className="bg-gray-100 border-none px-[1em] flex flex-row items-center gap-[1em] py-[1em] rounded-[1em]">
              <Card className="w-[4em] h-[4em] flex items-center justify-center bg-white  p-0 rounded-[1em]">
                <Clock
                  className="!h-[2.5em] !w-[2.5em]"
                  style={{
                    color: configuracao.corPrimaria,
                  }}
                />
              </Card>
              <div className="flex flex-col">
                <p className="text-[2em] font-semibold">Tempo já aguardado</p>
                <p className="text-[1.5em] text-muted-foreground">
                  Desde sua entrada na fila
                </p>
              </div>
              <p className="text-[2em]  ml-auto font-bold whitespace-nowrap">
                3 min
              </p>
            </Card>
            <Card className="bg-gray-100 border-none px-[1em] flex flex-row items-center gap-[1em] py-[1em] rounded-[1em]">
              <Card className="w-[4em] h-[4em] flex items-center justify-center bg-white  p-0 rounded-[1em] ">
                <Clock
                  className="!h-[2.5em] !w-[2.5em]"
                  style={{
                    color: configuracao.corPrimaria,
                  }}
                />
              </Card>
              <div className="flex flex-col">
                <p className="text-[2em] font-semibold">
                  Tempo médio de espera
                </p>
                <p className="text-[1.5em] text-muted-foreground">
                  Baseado no fluxo da fila
                </p>
              </div>
              <p className="text-[2em] ml-auto font-bold whitespace-nowrap">
                8 min
              </p>
            </Card>
          </div>
        </Card>
        <Card className="px-[2em] w-full">
          <p className="text-[2em] font-bold">Enquanto você espera</p>
          <div className="flex flex-row items-center gap-[1em]">
            <div
              className="w-[0.6em] h-[0.6em] rounded-full "
              style={{
                backgroundColor: configuracao.corPrimaria,
              }}
            />
            <p className="text-[1.5em]">
              Você receberá uma mensagem no seu WhatsApp quando chegar sua vez
            </p>
          </div>
          <div className="flex flex-row items-center gap-[1em]">
            <div
              className="w-[0.6em] h-[0.6em] rounded-full "
              style={{
                backgroundColor: configuracao.corPrimaria,
              }}
            />
            <p className="text-[1.5em]">
              Você pode desistir da fila se precisar
            </p>
          </div>
        </Card>
        <Button
          variant="ghost"
          className="!text-[2em] text-accent-foreground hover:text-red-500 mt-[0.5em]"
        >
          <LogOut className="!h-[1em] !w-[1em] text-accent-foreground hover:text-red-500 text-inherit" />
          Desistir da fila
        </Button>
      </div>
    </div>
  );
}
