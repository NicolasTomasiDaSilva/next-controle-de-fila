import { FilaContext } from "@/contexts/fila-context";
import { AdicionarClienteDTO, ClienteFormDTO } from "@/dtos/cliente";
import { Cliente } from "@/models/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function useEditarCliente() {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useEditarCliente must be used within a UserProvider");
  }

  const { setFila } = context;

  async function handleEditarCliente(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.atualizarDadosCliente(
        cliente
      );
      setFila(filaAtualizada);
      toast.success("Cliente editado com sucesso.");
    } catch (error: any) {
      toast.error("Erro ao editar cliente.");
    }
  }

  return { handleEditarCliente };
}
