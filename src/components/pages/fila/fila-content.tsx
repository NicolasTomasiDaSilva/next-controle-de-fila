"use client";

import { useSignalR } from "@/hooks/fila/use-signalr";
import { AdicionarClienteDialog } from "./TabelaPrincipal/AdicionarClienteDialog";
import TabelaPrincipal from "./TabelaPrincipal/TabelaPrincipal";
import TabelaRecentes from "./TabelaRecentes/TabelaRecentes";
import { useEffect } from "react";

export default function FilaContent() {
  const { connection } = useSignalR();

  useEffect(() => {
    if (!connection) return;

    console.log("Conectado ao SignalR");

    // Adiciona o listener
    const handleAdicionarCliente = (cliente: any) => {
      console.log("Novo cliente recebido:", cliente);
      // Aqui você atualiza seu estado ou faz o que precisar
    };

    connection.on("AdicionarCliente", handleAdicionarCliente);

    // Limpa o listener ao desmontar ou reconectar
    return () => {
      connection.off("AdicionarCliente", handleAdicionarCliente);
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
