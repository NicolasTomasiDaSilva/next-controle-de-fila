import { AcoesAdminEnum } from "@/lib/enums/acoes-admin-enum";
import { StatusEnum } from "@/lib/enums/status-enum";
import { Cliente } from "@/features/shared/models/cliente";
import { Fila } from "@/features/shared/models/fila";
import { filaService } from "@/features/fila/services/fila-service";
import { useState } from "react";
import { toast } from "sonner";

import { useFila } from "./use-fila";
import { DataEventoClienteDesistirDTO } from "@/features/fila/models/data-evento-hub-acao-cliente-dto";

export function useAcoesCliente() {
  const { fila, setFila, isSubmitting, setIsSubmitting } = useFila();

  async function handleChamarCliente(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.ChamarClientes
      );
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao chamar cliente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAusentarCliente(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.AusentarClientes
      );
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao marcar cliente como ausente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVoltarCliente(cliente: Cliente) {
    try {
      setIsSubmitting(true);
      const filaAtualizada: Fila = await filaService.atualizarStatusCliente(
        cliente.id,
        AcoesAdminEnum.VoltarParaFilaClientes
      );
      setFila(filaAtualizada);
    } catch (error: any) {
      toast.error("Erro ao devolver cliente para a fila.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleMoverCimaCliente(cliente: Cliente) {
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
    } catch (error: any) {
      toast.error("Erro ao mover cliente para cima.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleMoverBaixoCliente(cliente: Cliente) {
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
    } catch (error: any) {
      toast.error("Erro ao mover cliente para baixo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEventoClienteDesistiu(
    data: DataEventoClienteDesistirDTO
  ) {
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
    handleChamarCliente,
    handleAusentarCliente,
    handleMoverCimaCliente,
    handleMoverBaixoCliente,
    handleVoltarCliente,
    handleEventoClienteDesistiu,
  };
}
