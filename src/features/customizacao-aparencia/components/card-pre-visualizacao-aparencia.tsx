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

interface CardPreVisualizacaoAparenciaProps {
  form: UseFormReturn<ConfiguracaoFormDTO>;
}

export function CardPreVisualizacaoAparencia({
  form,
}: CardPreVisualizacaoAparenciaProps) {
  const { valores } = usePreVisualizacaoAparencia({ form });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Eye className="inline mr-2" />
          Pré-Visualização
        </CardTitle>
        <CardDescription>Veja como ficará sua configuração</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Container principal com proporção 16:9 */}
        <AspectRatio
          ratio={16 / 9}
          className="w-full rounded-md bg-gray-100 overflow-hidden border border-gray-300 relative"
        >
          {/* Carousel ocupa todo o espaço */}
          <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full">
              {/* Preview monitor (16:9) */}
              <CarouselItem className="w-full h-full flex items-center justify-center p-4">
                <AspectRatio
                  ratio={16 / 9}
                  className="w-full h-full bg-white rounded-md shadow-md flex items-center justify-center"
                >
                  {/* Aqui vai seu preview monitor */}
                  <span className="text-gray-500 text-xl font-semibold">
                    Preview do Monitor 16:9
                  </span>
                </AspectRatio>
              </CarouselItem>

              {/* Preview celular (9:16) */}
              <CarouselItem className="w-full h-full flex items-center justify-center p-4">
                {/* Aqui o truque: manter altura 100% do container e ajustar largura proporcional */}
                <AspectRatio
                  ratio={9 / 16}
                  className="h-full rounded-md bg-white shadow-md border border-green-400 flex items-center justify-center overflow-hidden"
                >
                  {/* Aqui seu preview celular */}
                  {/* <AppClientePreview configuracao={valores} /> */}
                  <span className="text-gray-500 text-xl font-semibold">
                    Preview do Celular 9:16
                  </span>
                </AspectRatio>
              </CarouselItem>
            </CarouselContent>

            {/* Botões de navegação */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-full bg-white shadow hover:bg-gray-100">
              ‹
            </CarouselPrevious>
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-full bg-white shadow hover:bg-gray-100">
              ›
            </CarouselNext>
          </Carousel>
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
