import { useEffect, useRef, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { connectToHub } from "@/lib/signalr/token/client";

import { eventosHub } from "@/constantes/eventos-hub";
import { toast } from "sonner";
import {
  DataEventoClienteDesistirDTO,
  dataEventoClienteDesistirSchema,
} from "@/dtos/data-evento-hub-acao-cliente";
import { useAcoesCliente } from "./use-acoes-cliente";

export function useSignalrFila() {
  const { handleEventoClienteDesistiu } = useAcoesCliente();
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    let connection: HubConnection;

    async function startConnection() {
      try {
        if (connectionRef.current) {
          await connectionRef.current.stop();
        }

        connection = await connectToHub();
        connectionRef.current = connection;

        connection.onclose(() => {
          toast.error("Erro de conexão.");
        });
        connection.onreconnecting(() => {
          toast.warning("Tentando se reconectar...");
        });
        connection.onreconnected(() => {
          toast.success("Reconectado com sucesso!");
        });

        connection.on(eventosHub.clienteDesistiu, async (data: any) => {
          const resultado = dataEventoClienteDesistirSchema.safeParse(data);
          if (!resultado.success) {
            throw new Error("Evento recebido inválido.");
          }
          await handleEventoClienteDesistiu(resultado.data);
        });

        await connection.start();
        console.log("Conexão iniciada com sucesso!");
      } catch (error) {
        toast.error("Erro ao iniciar conexão.");
      }
    }

    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off(eventosHub.clienteDesistiu);
        connectionRef.current.stop();
      }
    };
  }, []);
}
