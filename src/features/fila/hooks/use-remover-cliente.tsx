import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";
import { Cliente } from "@/models/cliente";
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
      toast.success("Cliente removido da fila.", { icon: "❌" });
    } catch (error: any) {
      toast.error("Erro ao remover cliente.");
    }
  }

  return { handleRemoverCliente };
}
