"use client";

import { useSignalR } from "@/hooks/use-signalr";
import { AdicionarClienteDialog } from "./TabelaPrincipal/AdicionarClienteDialog";
import TabelaPrincipal from "./TabelaPrincipal/TabelaPrincipal";
import TabelaRecentes from "./TabelaRecentes/TabelaRecentes";
import { useEffect } from "react";

export default function FilaContent() {
  const { connection } = useSignalR();
  useEffect(() => {
    console.log("AINDA NAO CONECTOU");
    if (connection) {
      console.log("CONECTOU");
      connection.on("AdicionarCliente", () => {});
    }
  }, [connection]);

  return (
    <div className="space-y-4">
      <AdicionarClienteDialog></AdicionarClienteDialog>
      <TabelaPrincipal></TabelaPrincipal>
      <TabelaRecentes></TabelaRecentes>
    </div>
  );
}
