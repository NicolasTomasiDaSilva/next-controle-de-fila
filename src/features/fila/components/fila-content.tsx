"use client";

import { useSignalrFila } from "@/features/fila/hooks/use-signalr-fila";
import { AdicionarClienteDialog } from "./adicionar-cliente-dialog";
import TabelaPrincipal from "./tabela-principal";
import TabelaRecentes from "./tabela-recentes";

export default function FilaContent() {
  useSignalrFila();

  return (
    <div className="space-y-4">
      <AdicionarClienteDialog></AdicionarClienteDialog>
      <TabelaPrincipal></TabelaPrincipal>
      <TabelaRecentes></TabelaRecentes>
    </div>
  );
}
