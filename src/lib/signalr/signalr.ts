import getTokensAction from "@/features/autenticacao/actions/cookies/get-tokens-action";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export async function connectToHub(): Promise<HubConnection> {
  const { accessToken } = await getTokensAction();
  const url: string = `${process.env.NEXT_PUBLIC_SIGNALR_BASE_URL}/controledefilahub?access_token=${accessToken}`;

  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect([0, 2000, 5000])
    .build();

  return connection;
}
