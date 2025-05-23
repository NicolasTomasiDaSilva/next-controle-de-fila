"use client";

import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";
import { UseFormReturn } from "react-hook-form";

interface PreVisualizacaoAparenciaProps {
  form: UseFormReturn<configuracaoFormDTO>;
  empresa: Empresa;
}

export function PreVisualizacaoAparencia({
  form,
}: PreVisualizacaoAparenciaProps) {
  const valores = form.watch();
  return (
    <div
      style={{
        backgroundColor: valores.corPrimaria || "#fff",
        color: valores.corSobreposicao || "#000",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>{valores.nomeDisplay || "Nome da Empresa"}</h3>
      <p>{valores.enderecoDisplay || "Endereço da Empresa"}</p>
      {valores.logoUrl ? (
        <img
          src={valores.logoUrl}
          alt="Logo Preview"
          width={100}
          height={100}
        />
      ) : (
        <div style={{ width: 100, height: 100, backgroundColor: "#ddd" }}>
          Sem logo
        </div>
      )}
    </div>
  );
}
