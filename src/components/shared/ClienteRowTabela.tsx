import { Cliente } from "@/models/cliente";
import { TableCell, TableRow } from "../ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Phone, Trash, CircleArrowUp, CircleArrowDown } from "lucide-react";

interface RowClientePersonalizadaProps {
  row: Row<Cliente>;
}

export default function ClienteRowTable({ row }: RowClientePersonalizadaProps) {
  const cliente: Cliente = row.original;
  return (
    <TableRow key={row.id} className="h-50">
      {cliente.status === 1 && (
        <TableCell className="text-center">
          <p className=" font-semibold text-sm">{cliente.posicao}</p>
        </TableCell>
      )}
      <TableCell>
        <p className="font-semibold">{cliente.nome}</p>
        {cliente.telefone && (
          <p className="text-sm text-muted-foreground">{cliente.telefone}</p>
        )}
      </TableCell>

      <TableCell className="text-center">
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(cliente.dataHoraCriado), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </TableCell>
      <TableCell className="text-center">
        <p className="text-sm text-muted-foreground">{cliente.status}</p>
      </TableCell>
      <TableCell className="text-center">
        <button className="text-green-600 hover:text-green-700 transition">
          <Phone className="w-5 h-5" />
        </button>

        <button className="text-black-600 hover:text-black-700 transition">
          <CircleArrowUp className="w-5 h-5" />
        </button>

        <button className="text-black-600 hover:text-black-700 transition">
          <CircleArrowDown className="w-5 h-5" />
        </button>

        <button className="text-red-600 hover:text-red-700 transition">
          <Trash className="w-5 h-5" />
        </button>
      </TableCell>
    </TableRow>
  );
}
