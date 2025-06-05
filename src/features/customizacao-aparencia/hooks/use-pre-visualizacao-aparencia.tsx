import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { UseFormReturn, useWatch } from "react-hook-form";
import { configuracaoFormDTO } from "@/dtos/configuracao";

interface usePreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}
export const usePreVisualizacaoAparencia = ({
  form,
}: usePreVisualizacaoAparenciaProps) => {
  const rawValores = useWatch({
    control: form.control,
    name: [
      "nomeDisplay",
      "corPrimaria",
      "corSobreposicao",
      "enderecoDisplay",
      "logoUrl",
    ],
  });

  const valores = {
    nomeDisplay: rawValores[0],
    corPrimaria: rawValores[1],
    corSobreposicao: rawValores[2],
    enderecoDisplay: rawValores[3],
    logoUrl: rawValores[4],
  };

  const [debouncedValores] = useDebounce(valores, 200);

  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("nomeDisplay", debouncedValores.nomeDisplay);
    p.set("corPrimaria", debouncedValores.corPrimaria);
    p.set("corSobreposicao", debouncedValores.corSobreposicao);
    if (debouncedValores.enderecoDisplay) {
      p.set("enderecoDisplay", debouncedValores.enderecoDisplay);
    }
    if (debouncedValores.logoUrl) {
      p.set("logoUrl", debouncedValores.logoUrl);
    }
    return p;
  }, [debouncedValores]);

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
  return {
    params,
    containerRef,
    maxPreviewHeight,
    scaleMonitor,
    scaleCelular,
    monitorSize,
    celularSize,
  };
};
