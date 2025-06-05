"use client";

import { useSignalR } from "@/features/fila/hooks/use-signalr";
import { AdicionarClienteDialog } from "./adicionar-cliente-dialog";
import TabelaPrincipal from "./tabela-principal";
import TabelaRecentes from "./tabela-recentes";
import { useEffect } from "react";
import useClienteDesistiu from "@/features/fila/hooks/use-cliente-desistiu";

export default function FilaContent() {
  const { connection } = useSignalR();
  const { handleClienteDesistiu } = useClienteDesistiu();

  useEffect(() => {
    if (!connection) {
      return;
    }

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
