import { FilaContext } from "@/contexts/fila-context";
import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function useAdicionarCliente() {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useAdicionarCliente must be used within a UserProvider");
  }

  const { fila, setFila } = context;

  async function handleAdicionarCliente(clienteForm: ClienteFormDTO) {
    try {
      const cliente: AdicionarClienteDTO = {
        ...clienteForm,
        filaId: fila.id,
      };

      const filaAtualizada: Fila = await filaService.adicionarCliente(cliente);
      setFila(filaAtualizada);
      toast.success("Cliente adicionado com sucesso.");
    } catch (error: any) {
      toast.error("Erro ao adicionar cliente.");
    }
  }

  return { handleAdicionarCliente };
}
