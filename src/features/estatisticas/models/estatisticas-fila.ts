import z from "zod";

export const EstatisticasFilaSchema = z.object({
  filaId: z.string().uuid(),
  empresaId: z.string().uuid(),
  tempoMedioEspera: z.string(),
  tempoMinimoEspera: z.string(),
  tempoMaximoEspera: z.string(),
  quantidadeClientesChamados: z.number(),
  quantidadeClientesDesistentes: z.number(),
  quantidadeClientesAusentes: z.number(),
  quantidadeClientesRemovidos: z.number(),
});

export type EstatisticasFilaDTO = z.infer<typeof EstatisticasFilaSchema>;
