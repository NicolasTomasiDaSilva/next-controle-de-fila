import { Cliente } from "@/models/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";

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
      toast.success("Cliente editado com sucesso.", { icon: "✏️" });
    } catch (error: any) {
      toast.error("Erro ao editar cliente.");
    }
  }

  return { handleEditarCliente };
}
