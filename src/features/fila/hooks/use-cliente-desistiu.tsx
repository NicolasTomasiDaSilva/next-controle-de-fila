import { Fila } from "@/features/shared/models/fila";
import { filaService } from "@/features/fila/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";
import { DataEventoHubAcaoClienteDTO } from "@/dtos/data-evento-hub-acao-cliente";

export default function useClienteDesistiu() {
  const { fila, setFila } = useFila();

  async function handleClienteDesistiu(data: DataEventoHubAcaoClienteDTO) {
    try {
      const { fila: filaAtualizada, cliente } = data;
      toast.warning(`Cliente ${cliente.nome} desistiu.`, {
        duration: 5000,
        icon: "😞",
      });
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao atualizar fila.");
    }
  }

  return { handleClienteDesistiu };
}
