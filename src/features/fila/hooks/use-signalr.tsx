import { useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { connectToHub } from "@/lib/signalr/token/client";

export function useSignalR() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

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

  return { connection };
}
