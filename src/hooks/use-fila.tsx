import { FilaContext } from "@/contexts/fila-context";
import { AdicionarClienteDTO } from "@/dtos/cliente";
import { StatusEnum } from "@/enums/status-enum";
import { Cliente } from "@/models/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service-client";
import { useContext } from "react";
import { toast } from "sonner";

export const useFila = () => {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { fila, setFila } = context;

  async function handleAdicionar(cliente: AdicionarClienteDTO) {
    try {
      const filaAtualizada: Fila = await filaService.AdicionarCliente(cliente);
      setFila(filaAtualizada);
      toast.success("Cliente adicionado à fila.", { icon: "➕" });
    } catch (error: any) {
      toast.error("Erro ao adicionar cliente à fila.");
    }
  }
  async function handleAtualizar(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.AtualizarCliente(cliente);
      setFila(filaAtualizada);
      toast.success("Cliente atualizado com sucesso.", { icon: "✏️" });
    } catch (error: any) {
      toast.error("Erro ao atualizar cliente.");
    }
  }

  async function handleChamar(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.ChamarCliente(cliente.id);
      setFila(filaAtualizada);
      toast.success("Cliente chamado.", { icon: "📢" });
    } catch (error: any) {
      toast.error("Erro ao chamar cliente.");
    }
  }
  async function handleRemover(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.RemoverCliente(cliente.id);
      setFila(filaAtualizada);
      toast.success("Cliente removido da fila.", { icon: "❌" });
    } catch (error: any) {
      toast.error("Erro ao remover cliente.");
    }
  }
  async function handleAusentar(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.AusentarCliente(
        cliente.id
      );
      setFila(filaAtualizada);
      toast.success("Cliente marcado como ausente.", { icon: "⏱️" });
    } catch (error: any) {
      toast.error("Erro ao marcar cliente como ausente.");
    }
  }
  async function handleMoverCima(cliente: Cliente) {
    try {
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
    }
  }
  async function handleMoverBaixo(cliente: Cliente) {
    try {
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
    }
  }

  async function handleAtender(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.AtenderCliente(cliente.id);
      setFila(filaAtualizada);
      toast.success("Cliente atendido.", { icon: "✅" });
    } catch (error: any) {
      toast.error("Erro ao atender cliente.");
    }
  }

  async function handleVoltar(cliente: Cliente) {
    try {
      const filaAtualizada: Fila = await filaService.VoltarCliente(cliente.id);
      setFila(filaAtualizada);
      toast.success("Cliente voltou para a fila.", { icon: "↩️" });
    } catch (error: any) {
      toast.error("Erro ao devolver cliente para a fila.");
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
};
