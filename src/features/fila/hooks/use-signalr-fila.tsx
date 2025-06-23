import { useEffect, useRef, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { connectToHub } from "@/lib/signalr/signalr";

import { eventosHub } from "@/lib/constants/eventos-hub";
import { toast } from "sonner";
import {
  DataEventoClienteDesistirDTO,
  dataEventoClienteDesistirSchema,
} from "@/features/fila/models/data-evento-hub-acao-cliente-dto";
import { useAcoesCliente } from "./use-acoes-cliente";

export function useSignalrFila() {
  const { handleEventoClienteDesistiu } = useAcoesCliente();
  const connectionRef = useRef<HubConnection | null>(null);
  const isReconnecting = useRef(false);

  useEffect(() => {
    let connection: HubConnection;

    async function startConnection() {
      try {
        if (connectionRef.current) {
          await connectionRef.current.stop();
        }

        connection = await connectToHub();
        connectionRef.current = connection;

        connection.onclose((error) => {
          if (isReconnecting.current) {
            toast.error("Conexão perdida. Não foi possível reconectar.", {
              duration: Infinity,
            });
          }
        });

        connection.onreconnecting(() => {
          isReconnecting.current = true;
          toast.warning("Tentando se reconectar...");
        });
        connection.onreconnected(() => {
          isReconnecting.current = false;
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
