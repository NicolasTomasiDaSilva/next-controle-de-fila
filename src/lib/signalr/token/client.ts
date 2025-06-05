import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export async function connectToHub(): Promise<HubConnection> {
  const res = await fetch("/api/signalr");
  const { url } = await res.json();

  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
}
