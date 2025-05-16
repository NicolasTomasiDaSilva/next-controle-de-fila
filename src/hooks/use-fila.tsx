import { FilaContext } from "@/contexts/fila-context";
import { StatusEnum } from "@/enums/status-enum";
import { Cliente } from "@/models/cliente";
import { Fila } from "@/models/fila";
import { filaService } from "@/services/fila-service-client";
import { useContext } from "react";

export const useFila = () => {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { fila, setFila } = context;

  async function onChamar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.ChamarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onRemover(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.RemoverCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onAusentar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.AusentarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onMoverCima(cliente: Cliente) {
    const novaPosicao: number = (cliente.posicao as number) - 1;
    if (!isPosicaoValida(novaPosicao)) {
      return;
    }
    const filaAtualizada: Fila = await filaService.MoverCliente(
      cliente.id,
      novaPosicao
    );
    setFila(filaAtualizada);
  }
  async function onMoverBaixo(cliente: Cliente) {
    const novaPosicao: number = (cliente.posicao as number) + 1;
    if (!isPosicaoValida(novaPosicao)) {
      return;
    }
    const filaAtualizada: Fila = await filaService.MoverCliente(
      cliente.id,
      novaPosicao
    );
    setFila(filaAtualizada);
  }

  async function onAtender(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.AtenderCliente(cliente.id);
    setFila(filaAtualizada);
  }

  async function onVoltar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.VoltarCliente(cliente.id);
    setFila(filaAtualizada);
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
    onChamar,
    onRemover,
    onAusentar,
    onMoverCima,
    onMoverBaixo,
    onAtender,
    onVoltar,
  };
};
