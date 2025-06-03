// hooks/useSignalR.ts
import { useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { connectToHub } from "@/lib/signalr/client";

export function useSignalR() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    let isMounted = true;

    connectToHub()
      .then((conn) => {
        if (isMounted) {
          setConnection(conn);
          // ex: conn.on("evento", handler)
        }
      })
      .catch(console.error);

    return () => {
      isMounted = false;
      connection?.stop();
    };
  }, []);

  return { connection };
}
