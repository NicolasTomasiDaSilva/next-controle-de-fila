//faça um delay aqui como funcao para que eu posso reutilizar, que receba ms

export function delayBotao(ms: number) {
  new Promise((resolve) => setTimeout(resolve, ms));
  return;
}
