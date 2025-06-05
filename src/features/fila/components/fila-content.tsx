"use client";

import { useSignalR } from "@/features/fila/hooks/use-signalr";
import { AdicionarClienteDialog } from "./adicionar-cliente-dialog";
import TabelaPrincipal from "./tabela-principal";
import TabelaRecentes from "./tabela-recentes";
import { useEffect } from "react";
import useClienteDesistiu from "@/features/fila/hooks/use-cliente-desistiu";
import { eventosHub } from "@/constantes/eventos-hub";
import { dataEventoHubAcaoClienteSchema } from "@/dtos/data-evento-hub-acao-cliente";
import { toast } from "sonner";

export default function FilaContent() {
  const { connection } = useSignalR();
  const { handleClienteDesistiu } = useClienteDesistiu();

  useEffect(() => {
    if (!connection) {
      return;
    }

    console.log("Conectado ao SignalR");

    connection.on(eventosHub.clienteDesistiu, (data) => {
      console.log("evento recebido");
      console.log(data);
      const result = dataEventoHubAcaoClienteSchema.safeParse(data);
      console.log(data);
      if (!result.success) {
        console.log("Erro ao atualizar fila", result.error);
        toast.error("Erro ao atualizar fila.");
        return;
      }
      console.log("sucesso ao transofmar scheam");

      const parsed = result.data;

      handleClienteDesistiu(parsed);
    });

    return () => {
      connection.off(eventosHub.clienteDesistiu);
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
