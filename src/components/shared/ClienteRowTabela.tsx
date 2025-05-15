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
} from "lucide-react";
import { StatusEnum, StatusMap } from "@/enums/status-enum";
import { Button } from "../ui/button";
import { filaService } from "@/services/fila-service-client";
import { Fila } from "@/models/fila";
import { useFila } from "@/hooks/use-fila";

interface RowClientePersonalizadaProps {
  row: Row<Cliente>;
}

export default function ClienteRowTable({ row }: RowClientePersonalizadaProps) {
  const { fila, setFila } = useFila();
  const cliente: Cliente = row.original;

  async function onChamar() {
    const filaAtualizada: Fila = await filaService.ChamarCliente(cliente.id);
    setFila(filaAtualizada);
  }
  async function onRemover() {
    const filaAtualizada: Fila = await filaService.RemoverCliente(cliente.id);
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

  function isPosicaoValida(novaPosicao: number): boolean {
    const isValida = fila.clientes.some(
      (cliente) =>
        cliente.status === StatusEnum.Aguardando &&
        cliente?.posicao == novaPosicao
    );
    return isValida;
  }

  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      <TableCell className="px-5 py-5 grid grid-cols-1 md:flex md:flex-row md:space-between md:grid-cols-2 md:gap-2">
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
          <Button
            variant="ghost"
            size="icon"
            className="size-5 text-gray-500 hover:text-blue-600 cursor-pointer ml-auto md:ml-2"
            onClick={() => {}}
          >
            <PencilLine className="size-4" />
          </Button>
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

            <div>
              <p className="md:text-right whitespace-normal">
                {cliente.observacao ?? "-"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {formatDistanceToNowStrict(new Date(cliente.dataHoraCriado), {
                  unit: "minute",
                  locale: ptBR,
                })}
              </span>
            </div>
          </div>
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
        </div>
      </TableCell>
    </TableRow>
  );
}
