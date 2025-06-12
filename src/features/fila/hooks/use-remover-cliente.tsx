import { Fila } from "@/features/shared/models/fila";
import { filaService } from "@/features/fila/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";
import { Cliente } from "@/features/shared/models/cliente";
import { AcoesAdminEnum } from "@/enums/acoes-admin-enum";

export default function useRemoverCliente() {
  const { fila, setFila } = useFila();

  async function handleRemoverCliente(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.RemoverClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente removido da fila.", { icon: "🗑️" });
    } catch (error: any) {
      toast.error("Erro ao remover cliente.");
    }
  }

  return { handleRemoverCliente };
}
