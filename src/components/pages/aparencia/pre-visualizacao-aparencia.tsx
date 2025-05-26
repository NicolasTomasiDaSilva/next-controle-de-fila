"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";
import { useDebounce } from "use-debounce";
import { UseFormReturn } from "react-hook-form";
import Simulador from "./simulador";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  return (
    <Carousel className="max-w-fit mx-auto bg-red-500">
      <CarouselContent className="p-0 m-0">
        <CarouselItem className="flex justify-center p-0 m-0">
          <Simulador
            scale={0.3}
            width={1920}
            height={1080}
            url={`/preview/monitor?${params.toString()}`}
          />
        </CarouselItem>
        <CarouselItem className="flex justify-center p-0 m-0">
          <Simulador
            scale={0.3}
            width={607.5}
            height={1080}
            url={`/preview/monitor?${params.toString()}`}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
