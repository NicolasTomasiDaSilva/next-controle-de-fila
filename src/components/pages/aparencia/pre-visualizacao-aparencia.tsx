"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";

import { UseFormReturn } from "react-hook-form";
import { Monitor } from "./monitor-mock/monitor";
import { SimuladorMonitor } from "./simuladores/simulador-monitor";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  return (
    <div className="mx-auto">
      <SimuladorMonitor>
        <Monitor valores={valores} />
      </SimuladorMonitor>
    </div>
  );
}
