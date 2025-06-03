// lib/signalr/client.ts
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export async function connectToHub(): Promise<HubConnection> {
  const res = await fetch("/api/signalr");
  const { url, accessToken } = await res.json();

  const connection = new HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
}
