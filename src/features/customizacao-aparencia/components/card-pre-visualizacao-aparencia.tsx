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
      <CardContent className="space-y-4">
        <Carousel className="w-3/4 mx-auto">
          <CarouselContent>
            <CarouselItem className="flex items-center justify-center w-full ">
              <div className="w-full aspect-[16/9] bg-gray-200 flex items-center justify-center rounded-md">
                {/* <MonitorPreview configuracao={valores} /> */}
              </div>
            </CarouselItem>

            <CarouselItem className="flex items-center justify-center w-full">
              <div className="h-full aspect-[9/16] bg-gray-300 flex items-center justify-center">
                {/* <AppClientePreview configuracao={valores} /> */}
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
