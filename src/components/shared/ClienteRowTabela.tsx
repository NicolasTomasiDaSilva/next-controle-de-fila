"use client";

import { Cliente } from "@/models/cliente";
import { TableCell, TableRow } from "../ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Phone,
  Trash,
  CircleArrowUp,
  CircleArrowDown,
  PencilLine,
  Clock,
  CheckCircle,
  CircleArrowLeft,
  XCircle,
} from "lucide-react";
import { StatusEnum, StatusMap } from "@/enums/status-enum";
import { Button } from "../ui/button";
import { filaService } from "@/services/fila-service-client";
import { Fila } from "@/models/fila";
import { useFila } from "@/hooks/use-fila";
import { EditarClienteDialog } from "../TabelaPrincipal/EditarClienteDialog";

interface RowClientePersonalizadaProps {
  cliente: Cliente;
}

export default function ClienteRowTable({
  cliente,
}: RowClientePersonalizadaProps) {
  const { fila, setFila } = useFila();

  async function onChamar() {
    const filaAtualizada: Fila = await filaService.ChamarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onRemover() {
    const filaAtualizada: Fila = await filaService.RemoverCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onAusentar() {
    const filaAtualizada: Fila = await filaService.AusentarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onMoverCima() {
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
  async function onMoverBaixo() {
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

  async function onAtender() {
    const filaAtualizada: Fila = await filaService.AtenderCliente(cliente.id);
    setFila(filaAtualizada);
  }

  async function onVoltar() {
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

  return (
    <td>
      <div className="w-full px-5 py-5 grid grid-cols-1 md:flex md:flex-row md:space-between md:grid-cols-2 md:gap-2">
        <div className="flex flex-row items-center gap-2 col-span-1">
          {cliente.posicao && (
            <span className="text-lg font-extrabold text-blue-500 mr-2 md:mr-6 ">
              {cliente.posicao}
            </span>
          )}
          <div>
            <p className="text-lg font-bold  whitespace-normal">
              {cliente.nome}
            </p>
            {cliente.telefone && (
              <p className="text-sm text-muted-foreground">
                {cliente.telefone}
              </p>
            )}
          </div>
          {cliente.status == StatusEnum.Aguardando && (
            <EditarClienteDialog cliente={cliente} />
          )}
        </div>
        <div className="col-span-1 flex items-center justify-between md:ml-auto gap-2">
          <div className="flex flex-col items-start md:gap-4 md:flex-row md:items-center ">
            {cliente.status != StatusEnum.Aguardando && (
              <div className="md:order-1">
                <p
                  className={`text-base whitespace-nowrap ${
                    StatusMap[cliente.status as StatusEnum]?.className
                  }`}
                >
                  {StatusMap[cliente.status as StatusEnum]?.label}
                </p>
              </div>
            )}

            {cliente.status === StatusEnum.Aguardando && (
              <p className="md:text-right whitespace-normal">
                {cliente.observacao ?? "-"}
              </p>
            )}

            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {formatDistanceToNowStrict(
                  new Date(
                    cliente.status === StatusEnum.Aguardando
                      ? cliente.dataHoraCriado
                      : cliente.dataHoraAlterado
                  ),
                  {
                    unit: "minute",
                    locale: ptBR,
                  }
                )}
              </span>
            </div>
          </div>

          {cliente.status === StatusEnum.Aguardando && (
            <div className=" min-w-max w-[max-content] grid grid-cols-2 md:grid-cols-4 gap-2 ">
              <button
                onClick={onMoverCima}
                className="text-black-600 hover:text-black-700 transition md:order-2 cursor-pointer"
              >
                <CircleArrowUp className="w-7 h-7" />
              </button>
              <button
                onClick={onMoverBaixo}
                className="text-black-600 hover:text-black-700 transition md:order-3 cursor-pointer"
              >
                <CircleArrowDown className="w-7 h-7" />
              </button>
              <button
                onClick={onChamar}
                className="text-green-600 hover:text-green-700 transition md:order-1 cursor-pointer"
              >
                <Phone className="w-7 h-7" />
              </button>
              <button
                onClick={onRemover}
                className="text-red-600 hover:text-red-700 transition md:order-4 cursor-pointer"
              >
                <Trash className="w-7 h-7" />
              </button>
            </div>
          )}
          {cliente.status === StatusEnum.Chamado && (
            <div className=" min-w-max w-[max-content] grid grid-cols-3 gap-2 ">
              <button
                onClick={onAtender}
                className="text-green-500 transition md:order-1 cursor-pointer"
              >
                <CheckCircle className="w-7 h-7" />
              </button>

              <button
                onClick={onVoltar}
                className="text-blue-500  transition md:order-4 cursor-pointer"
              >
                <CircleArrowLeft className="w-7 h-7" />
              </button>
              <button
                onClick={onAusentar}
                className="text-red-500 transition md:order-1 cursor-pointer"
              >
                <XCircle className="w-7 h-7" />
              </button>
            </div>
          )}
        </div>
      </div>
    </td>
  );
}
