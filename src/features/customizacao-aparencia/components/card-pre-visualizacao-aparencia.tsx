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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MonitorPreview from "./monitor-preview/monitor-content";
import AppClientePreview from "./app-cliente-preview/app-cliente-content";
import React from "react";

interface CardPreVisualizacaoAparenciaProps {
  form: UseFormReturn<ConfiguracaoFormDTO>;
}

export function CardPreVisualizacaoAparencia({
  form,
}: CardPreVisualizacaoAparenciaProps) {
  const { valores } = usePreVisualizacaoAparencia({ form });

  // Largura e altura reais do preview
  const realWidth = 1920;
  const realHeight = 1080;

  // Aqui vamos usar um ref para pegar a largura atual do container do carousel
  // para calcular a escala dinamicamente
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    function updateScale() {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setScale(width / realWidth);
      }
    }

    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
        <Carousel className="w-3/4 mx-auto">
          <CarouselContent>
            <CarouselItem className="flex items-center justify-center w-full">
              <div
                style={{
                  width: realWidth,
                  height: realHeight,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className="bg-gray-200 rounded-md shadow-lg overflow-hidden"
              >
                {/* Aqui renderiza o componente real, em tamanho natural */}
                {/* <MonitorPreview configuracao={valores} /> */}
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  Monitor Preview (1920x1080)
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="flex items-center justify-center w-full">
              <div
                style={{
                  width: realHeight, // para o preview vertical, troca largura e altura
                  height: realWidth,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className="bg-gray-300 rounded-md shadow-lg overflow-hidden"
              >
                {/* <AppClientePreview configuracao={valores} /> */}
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  App Cliente Preview (1080x1920)
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 ml-2 z-10 cursor-pointer" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 z-10 cursor-pointer" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
