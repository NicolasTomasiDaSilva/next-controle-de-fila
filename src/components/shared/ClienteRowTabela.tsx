// // components/ClienteRowTabela.tsx
// "use client";
// import { Cliente } from "@/models/cliente";
// import { TableCell, TableRow } from "@/components/ui/table";
// import { flexRender, Column } from "@tanstack/react-table";
// import { StatusMap } from "@/enums/status-enum";

// interface ClienteRowTabelaProps {
//   row: Cliente;
//   getVisibleCells: () => Array<{
//     id: string;
//     column: Column<Cliente, unknown>;
//     getContext: () => any;
//   }>;
// }

// export default function ClienteRowTabela({
//   row,
//   getVisibleCells,
// }: ClienteRowTabelaProps) {
//   return (
//     <TableRow className="bg-white">
//       {getVisibleCells().map((cell) => (
//         <TableCell className="h-20" key={cell.id}>
//           {cell.column.id === "actions" ? (
//             <button
//               onClick={() => alert(`Editar ${row.nome}`)}
//               className="text-blue-500 hover:underline"
//             >
//               Editar
//             </button>
//           ) : cell.column.id === "nome" ? (
//             <span className="font-bold">{row.nome}</span>
//           ) : cell.column.id === "status" ? (
//             <span
//               className={`px-2 py-1 rounded ${
//                 StatusMap[row.status]?.className || "bg-gray-200"
//               }`}
//             >
//               {StatusMap[row.status]?.label || "Desconhecido"}
//             </span>
//           ) : (
//             flexRender(cell.column.columnDef.cell, cell.getContext())
//           )}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }
