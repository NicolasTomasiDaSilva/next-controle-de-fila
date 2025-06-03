import { FilaContext } from "@/contexts/fila-context";
import { AdicionarClienteDTO } from "@/dtos/cliente";
import { AcoesAdminEnum } from "@/enums/acoes-admin-enum";
import { StatusEnum } from "@/enums/status-enum";
import { Cliente } from "@/models/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service";

import { useContext, useState } from "react";
import { toast } from "sonner";

export function useFila() {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { fila, setFila } = context;

  async function handleAdicionar(cliente: AdicionarClienteDTO) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.adicionarCliente(cliente);
      setFila(filaAtualizada);
      toast.success("Cliente adicionado à fila.", { icon: "➕" });
    } catch (error: any) {
      toast.error("Erro ao adicionar cliente à fila.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleAtualizar(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarDadosCliente(
        cliente
      );
      setFila(filaAtualizada);
      toast.success("Cliente atualizado com sucesso.", { icon: "✏️" });
    } catch (error: any) {
      toast.error("Erro ao atualizar cliente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleChamar(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.ChamarClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente chamado.", { icon: "📢" });
    } catch (error: any) {
      toast.error("Erro ao chamar cliente.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleRemover(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.RemoverClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente removido da fila.", { icon: "❌" });
    } catch (error: any) {
      toast.error("Erro ao remover cliente.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleAusentar(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.AusentarClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente marcado como ausente.", { icon: "⏱️" });
    } catch (error: any) {
      toast.error("Erro ao marcar cliente como ausente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAtender(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.AtenderClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente atendido.", { icon: "✅" });
    } catch (error: any) {
      toast.error("Erro ao atender cliente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVoltar(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.VoltarParaFilaClientes
      );
      setFila(filaAtualizada);
      toast.success("Cliente voltou para a fila.", { icon: "↩️" });
    } catch (error: any) {
      toast.error("Erro ao devolver cliente para a fila.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleMoverCima(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const novaPosicao: number = (cliente.posicao as number) - 1;
      if (!isPosicaoValida(novaPosicao)) {
        return;
      }
      const filaAtualizada: Fila = await filaService.MoverCliente(
        cliente.id,
        novaPosicao
      );
      setFila(filaAtualizada);
      toast.success("Cliente movido para cima.", { icon: "⬆️" });
    } catch (error: any) {
      toast.error("Erro ao mover cliente para cima.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleMoverBaixo(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const novaPosicao: number = (cliente.posicao as number) + 1;
      if (!isPosicaoValida(novaPosicao)) {
        return;
      }
      const filaAtualizada: Fila = await filaService.MoverCliente(
        cliente.id,
        novaPosicao
      );
      setFila(filaAtualizada);
      toast.success("Cliente movido para baixo.", { icon: "⬇️" });
    } catch (error: any) {
      toast.error("Erro ao mover cliente para baixo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function isPosicaoValida(novaPosicao: number): boolean {
    const isValida = fila.clientes.some(
      (cliente) =>
        cliente.status === StatusEnum.Aguardando &&
        cliente?.posicao == novaPosicao
    );
    return isValida;
  }

  return {
    isSubmitting,
    fila,
    setFila,
    handleAdicionar,
    handleAtualizar,
    handleChamar,
    handleRemover,
    handleAusentar,
    handleMoverCima,
    handleMoverBaixo,
    handleAtender,
    handleVoltar,
  };
}
