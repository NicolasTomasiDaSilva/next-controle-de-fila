export default function formatarData(date: Date): string {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const diaSemana = dias[date.getDay()];
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const hora = String(date.getHours()).padStart(2, "0");
  const minuto = String(date.getMinutes()).padStart(2, "0");

  return `${diaSemana}, ${dia}/${mes} ${hora}:${minuto}`;
}

export function calcularTempoDecorridoEmMinutos(dataInicio: Date): string {
  const agora = new Date();
  const diferencaMs = agora.getTime() - dataInicio.getTime();
  const minutos = Math.floor(diferencaMs / 1000 / 60);

  return minutos.toFixed(0);
}
