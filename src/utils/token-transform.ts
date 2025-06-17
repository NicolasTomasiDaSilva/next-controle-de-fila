export function formatarComoWhatsApp(texto: string): string {
  // Negrito: *texto*
  texto = texto.replace(/\*(\S(.*?\S)?)\*/g, "<strong>$1</strong>");

  // Itálico: _texto_
  texto = texto.replace(/_(\S(.*?\S)?)_/g, "<em>$1</em>");

  // Tachado: ~texto~
  texto = texto.replace(/~(\S(.*?\S)?)~/g, "<s>$1</s>");

  return texto;
}
