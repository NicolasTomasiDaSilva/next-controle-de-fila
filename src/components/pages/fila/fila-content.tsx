"use client";

import { useSignalR } from "@/hooks/fila/use-signalr";
import { AdicionarClienteDialog } from "./TabelaPrincipal/AdicionarClienteDialog";
import TabelaPrincipal from "./TabelaPrincipal/TabelaPrincipal";
import TabelaRecentes from "./TabelaRecentes/TabelaRecentes";
import { useEffect } from "react";
import useClienteDesistiu from "@/hooks/fila/use-cliente-desistiu";

export default function FilaContent() {
  const { connection } = useSignalR();
  const { handleClienteDesistiu } = useClienteDesistiu();

  useEffect(() => {
    if (!connection) return;

    console.log("Conectado ao SignalR");

    connection.on("AtualizarFila", handleClienteDesistiu);

    return () => {
      connection.off("AtualizarFila", handleClienteDesistiu);
    };
  }, [connection]);

  return (
    <div className="space-y-4">
      <AdicionarClienteDialog></AdicionarClienteDialog>
      <TabelaPrincipal></TabelaPrincipal>
      <TabelaRecentes></TabelaRecentes>
    </div>
  );
}
