import { Cliente } from "@/models/cliente";
import { TableCell, TableRow } from "../ui/table";
import { flexRender, Row } from "@tanstack/react-table";

interface RowClientePersonalizadaProps {
  row: Row<Cliente>;
}

export default function ClienteRowTable({ row }: RowClientePersonalizadaProps) {
  const cliente = row.original;
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
