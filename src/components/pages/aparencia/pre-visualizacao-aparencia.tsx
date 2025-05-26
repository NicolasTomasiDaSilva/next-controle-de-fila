"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";
import { useDebounce } from "use-debounce";
import { UseFormReturn } from "react-hook-form";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  const scale = 0.2;
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

  const url = `/preview?${params.toString()}`;

  return (
    <div className="mx-auto">
      <div
        className="overflow-hidden border shadow rounded"
        style={{
          width: `${1920 * scale}px`,
          height: `${1080 * scale}px`,
        }}
      >
        <iframe
          key={url}
          src={url}
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
