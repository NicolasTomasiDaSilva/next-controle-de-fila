import { FilaContext } from "@/contexts/fila-context";
import { AdicionarClienteDTO } from "@/dtos/cliente";
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

  async function handleAdicionar(cliente: AdicionarClienteDTO) {
    const filaAtualizada: Fila = await filaService.AdicionarCliente(cliente);
    setFila(filaAtualizada);
  }
  async function handleAtualizar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.AtualizarCliente(cliente);
    setFila(filaAtualizada);
  }

  async function handleChamar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.ChamarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function handleRemover(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.RemoverCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function handleAusentar(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.AusentarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function handleMoverCima(cliente: Cliente) {
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
  async function handleMoverBaixo(cliente: Cliente) {
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

  async function handleAtender(cliente: Cliente) {
    const filaAtualizada: Fila = await filaService.AtenderCliente(cliente.id);
    setFila(filaAtualizada);
  }

  async function handleVoltar(cliente: Cliente) {
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
