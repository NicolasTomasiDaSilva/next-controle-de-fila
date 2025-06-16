import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { Fila } from "@/features/shared/models/fila";
import { filaService } from "@/features/fila/services/fila-service";

import { toast } from "sonner";
import { useFila } from "./use-fila";

export default function useAdicionarCliente() {
  const { fila, setFila } = useFila();

  async function handleAdicionarCliente(clienteForm: ClienteFormDTO) {
    try {
      const cliente: AdicionarClienteDTO = {
        ...clienteForm,
        filaId: fila.id,
      };

      const filaAtualizada: Fila = await filaService.adicionarCliente(cliente);
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao adicionar cliente.");
    }
  }

  return { handleAdicionarCliente };
}
