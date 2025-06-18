export function delayBotao(ms: number) {
  new Promise((resolve) => setTimeout(resolve, ms));
  return;
}
