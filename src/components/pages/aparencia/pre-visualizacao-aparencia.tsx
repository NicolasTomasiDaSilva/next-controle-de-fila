"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Simulador from "./simulador";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  const [debouncedValores] = useDebounce(valores, 300);
  const params = new URLSearchParams();
  params.set("nomeDisplay", debouncedValores.nomeDisplay);
  params.set("corPrimaria", debouncedValores.corPrimaria);
  params.set("corSobreposicao", debouncedValores.corSobreposicao);
  if (debouncedValores.enderecoDisplay) {
    params.set("enderecoDisplay", debouncedValores.enderecoDisplay);
  }
  if (debouncedValores.logoUrl) {
    params.set("logoUrl", debouncedValores.logoUrl);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxPreviewHeight, setMaxPreviewHeight] = useState(300);

  const MAX_HEIGHT = 600;
  const monitorSize = { width: 1920, height: 1080 };
  const celularSize = { width: 540, height: 960 };

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const maxWidthPreview = width * 0.9;

      const scaleByWidthMonitor = maxWidthPreview / monitorSize.width;
      const scaleByHeightMonitor = MAX_HEIGHT / monitorSize.height;
      const scaleMonitor = Math.min(scaleByWidthMonitor, scaleByHeightMonitor);

      const scaleByWidthCelular = maxWidthPreview / celularSize.width;
      const scaleByHeightCelular = MAX_HEIGHT / celularSize.height;
      const scaleCelular = Math.min(scaleByWidthCelular, scaleByHeightCelular);

      const finalScale = Math.min(scaleMonitor, scaleCelular);

      setMaxPreviewHeight(finalScale * monitorSize.height);
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const scaleMonitor = maxPreviewHeight / monitorSize.height;
  const scaleCelular = maxPreviewHeight / celularSize.height;

  return (
    <>
      <CardHeader>
        <CardTitle>
          <Eye className="inline mr-2" />
          Pré Visualização
        </CardTitle>
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
    </>
  );
}
