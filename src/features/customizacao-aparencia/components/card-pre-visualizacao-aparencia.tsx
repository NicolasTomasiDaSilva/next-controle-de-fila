"use client";

import { ConfiguracaoFormDTO } from "@/dtos/configuracao";
import { UseFormReturn } from "react-hook-form";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Simulador from "./simulador";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { usePreVisualizacaoAparencia } from "@/features/customizacao-aparencia/hooks/use-pre-visualizacao-aparencia";

interface CardPreVisualizacaoAparenciaProps {
  form: UseFormReturn<ConfiguracaoFormDTO>;
}

export function CardPreVisualizacaoAparencia({
  form,
}: CardPreVisualizacaoAparenciaProps) {
  const {
    params,
    containerRef,
    maxPreviewHeight,
    scaleMonitor,
    scaleCelular,
    monitorSize,
    celularSize,
  } = usePreVisualizacaoAparencia({ form });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Eye className="inline mr-2" />
          Pré-Visualização
        </CardTitle>
        <CardDescription>Veja como ficará sua configuração</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full mx-auto sm:w-[80%]	">
          <Carousel className="relative w-full max-w-full overflow-hidden">
            <CarouselContent>
              <CarouselItem className="flex justify-center">
                <Simulador
                  url={`/preview/monitor?${params.toString()}`}
                  width={monitorSize.width}
                  height={monitorSize.height}
                  scale={scaleMonitor}
                  maxPreviewHeight={maxPreviewHeight}
                ></Simulador>
              </CarouselItem>

              <CarouselItem className="flex justify-center">
                <Simulador
                  url={`/preview/app-usuario?${params.toString()}`}
                  width={celularSize.width}
                  height={celularSize.height}
                  scale={scaleCelular}
                  maxPreviewHeight={maxPreviewHeight}
                ></Simulador>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="left-0 ml-2 cursor-pointer sm:ml-0" />
            <CarouselNext className="right-0 mr-2 cursor-pointer sm:mr-0" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}
