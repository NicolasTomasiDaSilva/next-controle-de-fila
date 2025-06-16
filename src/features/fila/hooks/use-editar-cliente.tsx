import { Cliente } from "@/features/shared/models/cliente";
import { Fila } from "@/features/shared/models/fila";
import { filaService } from "@/features/fila/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";

export default function useEditarCliente() {
  const { fila, setFila } = useFila();

  async function handleEditarCliente(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.atualizarDadosCliente(
        cliente
      );
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao editar cliente.");
    }
  }

  return { handleEditarCliente };
}
