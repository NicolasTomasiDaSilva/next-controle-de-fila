import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export async function connectToHub(): Promise<HubConnection> {
  const res = await fetch("/api/signalr");
  const { url } = await res.json();

  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

  // Loga caso a conexão caia
  connection.onclose((error) => {
    console.log("🔴 SignalR desconectado.", error);
  });

  // Loga tentativa de reconexão
  connection.onreconnecting((error) => {
    console.log("🟡 Tentando reconectar ao SignalR...", error);
  });

  // Loga quando reconecta com sucesso
  connection.onreconnected((connectionId) => {
    console.log("🟢 Reconectado ao SignalR com ID:", connectionId);
  });

  return connection;
}
