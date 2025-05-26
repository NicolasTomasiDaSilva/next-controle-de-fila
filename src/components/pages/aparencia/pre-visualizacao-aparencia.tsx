"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  const [debouncedValores] = useDebounce(valores, 300);

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxPreviewHeight, setMaxPreviewHeight] = useState(300);

  const MAX_HEIGHT = 600;

  const monitorSize = { width: 1920, height: 1080 };
  const celularSize = { width: 1080, height: 1920 };

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

  const url = `/preview/monitor?${params.toString()}`;

  return (
    <div ref={containerRef} className="w-full max-w-full">
      <Tabs defaultValue="monitor" className="w-full">
        <TabsList className=" block mx-auto">
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
          <TabsTrigger value="celular">App Usuario</TabsTrigger>
        </TabsList>

        <TabsContent value="monitor" className="flex flex-col items-center">
          <div
            className="border shadow overflow-hidden"
            style={{
              width: monitorSize.width * scaleMonitor,
              height: maxPreviewHeight,
              position: "relative",
            }}
          >
            <iframe
              src={url}
              width={monitorSize.width}
              height={monitorSize.height}
              style={{
                transform: `scale(${scaleMonitor})`,
                transformOrigin: "top left",
                width: monitorSize.width,
                height: monitorSize.height,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                border: "none",
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="celular" className="flex flex-col items-center">
          <div
            className="border shadow overflow-hidden"
            style={{
              width: celularSize.width * scaleCelular,
              height: maxPreviewHeight,
              position: "relative",
            }}
          >
            <iframe
              src={url}
              width={celularSize.width}
              height={celularSize.height}
              style={{
                transform: `scale(${scaleCelular})`,
                transformOrigin: "top left",
                width: celularSize.width,
                height: celularSize.height,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                border: "none",
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
