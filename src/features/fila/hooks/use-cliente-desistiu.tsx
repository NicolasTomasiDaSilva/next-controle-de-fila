import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";

export default function useClienteDesistiu() {
  const { fila, setFila } = useFila();

  async function handleClienteDesistiu() {
    try {
      toast.warning("Cliente desistiu.");
      const filaAtualizada: Fila = await filaService.obterFilaPorId(fila.id);
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao atualizar fila.");
    }
  }

  return { handleClienteDesistiu };
}
