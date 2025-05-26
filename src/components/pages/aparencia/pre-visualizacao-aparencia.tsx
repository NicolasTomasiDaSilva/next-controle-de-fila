"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  const [debouncedValores] = useDebounce(valores, 300);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const MAX_HEIGHT = 500;

  const monitorSize = { width: 1920, height: 1080 };
  const celularSize = { width: 1080, height: 1920 };

  // Altura máxima do preview (ajustada pelo container)
  const [maxPreviewHeight, setMaxPreviewHeight] = useState(300);

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;

      // Agora usamos 90% da largura do container para cada preview
      const maxWidthPreview = width * 0.9;

      // Calcular escala para monitor
      const scaleByWidthMonitor = maxWidthPreview / monitorSize.width;
      const scaleByHeightMonitor = MAX_HEIGHT / monitorSize.height;
      const scaleMonitor = Math.min(scaleByWidthMonitor, scaleByHeightMonitor);

      // Calcular escala para celular
      const scaleByWidthCelular = maxWidthPreview / celularSize.width;
      const scaleByHeightCelular = MAX_HEIGHT / celularSize.height;
      const scaleCelular = Math.min(scaleByWidthCelular, scaleByHeightCelular);

      // Pegamos o menor scale para manter coerência e evitar overflow vertical
      const finalScale = Math.min(scaleMonitor, scaleCelular);

      setMaxPreviewHeight(finalScale * monitorSize.height);
      setContainerWidth(width);
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Aplicar escala baseada na altura máxima calculada
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
    <div
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center gap-8"
      style={{ maxWidth: "100%" }}
    >
      {/* Preview Monitor */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">
          Monitor 1920x1080
        </span>
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
      </div>

      {/* Preview Celular */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">
          Celular 1080x1920
        </span>
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
      </div>
    </div>
  );
}
