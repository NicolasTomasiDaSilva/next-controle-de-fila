import { useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { connectToHub } from "@/lib/signalr/token/client";
import useClienteDesistiu from "./use-cliente-desistiu";
import { dataEventoHubAcaoClienteSchema } from "@/dtos/data-evento-hub-acao-cliente";
import { eventosHub } from "@/constantes/eventos-hub";
import { toast } from "sonner";

export function useSignalrFila() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { handleClienteDesistiu } = useClienteDesistiu();

  useEffect(() => {
    let isMounted = true;
    let currentConnection: HubConnection | null = null;

    connectToHub()
      .then((conn) => {
        if (!isMounted) return;

        setConnection(conn);
        currentConnection = conn;
      })
      .catch(console.error);

    return () => {
      isMounted = false;

      if (currentConnection) {
        currentConnection.stop().then(() => {
          console.log("SignalR desconectado");
        });
      }
    };
  }, []);

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
        toast.error("Erro ao atualizar fila.");
        return;
      }
      const parsed = result.data;
      handleClienteDesistiu(parsed);
    });

    return () => {
      connection.off(eventosHub.clienteDesistiu);
    };
  }, [connection]);

  return { connection };
}
