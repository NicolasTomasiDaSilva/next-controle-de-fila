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
      className="flex-1 flex flex-col items-center justify-center"
      style={{
        backgroundImage: "none",
        background: `linear-gradient(to bottom, ${configuracao.corPrimaria} 0%, white 100%)`,
      }}
    >
      <div className="flex flex-col justify-center items-center gap-2 p-2 max-w-150">
        <Card className="px-4 w-full py-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-extrabold leading-none text-center line-clamp-2">
              {configuracao.nomeDisplay}
            </p>
            {configuracao.logoUrl && (
              <Image
                src={configuracao.logoUrl}
                width={100}
                height={100}
                alt="Logo"
                className="rounded-md object-cover w-25 h-25"
                priority
              />
            )}
            {configuracao.enderecoDisplay && (
              <p className="leading-none  text-center max-w-full text-muted-foreground">
                <MapPin className="!h-5 !w-5 inline text-black" />{" "}
                {configuracao.enderecoDisplay}
              </p>
            )}
          </div>
          <div className="flex flex-col h-45 justify-between ">
            <p className="text-center font-bold">Sua posição na fila</p>
            <div
              className={`font-(family-name:--font-geist-sans) text-9xl  text-center font-extrabold leading-none`}
              style={{
                color: configuracao.corPrimaria,
              }}
            >
              7
            </div>
            <p className=" text-center text-muted-foreground">
              Atualizado em tempo real
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Card className="bg-gray-100 border-none px-2 flex flex-row items-center gap-2 py-1.5 rounded-1">
              <Card className="w-10 h-10 flex items-center justify-center bg-white  p-0 rounded-1">
                <Clock
                  className="!h-5 !w-5"
                  style={{
                    color: configuracao.corPrimaria,
                  }}
                />
              </Card>
              <div className="flex flex-col">
                <p className=" font-semibold">Tempo já aguardado</p>
                <p className=" text-muted-foreground text-sm">
                  Desde sua entrada na fila
                </p>
              </div>
              <p className="  ml-auto font-bold whitespace-nowrap">23 min</p>
            </Card>
            <Card className="bg-gray-100 border-none px-2 flex flex-row items-center gap-2 py-1.5 rounded-1">
              <Card className="w-10 h-10 flex items-center justify-center bg-white  p-0 rounded-1 ">
                <Clock
                  className="!h-5 !w-5"
                  style={{
                    color: configuracao.corPrimaria,
                  }}
                />
              </Card>
              <div className="flex flex-col">
                <p className="font-semibold">Tempo médio de espera</p>
                <p className="text-muted-foreground text-sm">
                  Baseado no fluxo da fila
                </p>
              </div>
              <p className=" ml-auto font-bold whitespace-nowrap">10 min</p>
            </Card>
          </div>
        </Card>
        <Card className="px-4 w-full py-4 gap-4">
          <p className="font-bold">Enquanto você espera</p>
          <div className="flex flex-row items-center gap-2">
            <div
              className="!w-1 !h-1 rounded-full shrink-0 "
              style={{
                backgroundColor: configuracao.corPrimaria,
              }}
            />
            <p className="text-sm">
              Você receberá uma mensagem no seu WhatsApp quando chegar sua vez
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              className="!w-1 !h-1 rounded-full shrink-0"
              style={{
                backgroundColor: configuracao.corPrimaria,
              }}
            />
            <p className="text-sm">Você pode desistir da fila se precisar</p>
          </div>
        </Card>
        <Button
          variant="ghost"
          className=" text-accent-foreground hover:text-red-500 text-lg mt-2"
        >
          <LogOut className="!h-4 !w-4 text-accent-foreground hover:text-red-500 text-inherit" />
          Desistir da fila
        </Button>
      </div>
    </div>
  );
}
