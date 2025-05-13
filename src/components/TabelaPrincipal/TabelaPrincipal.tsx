"use client";
import { Cliente } from "@/models/cliente";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import HeaderTabelaPrincipal from "./HeaderTabelaPrincipal";

const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => {
      const { nome } = row.original;
      return <div>{nome}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <div>{status}</div>;
    },
  },
];

interface TabelaPrincipalProps {
  clientes: Cliente[];
  searchFields?: string[];
}

export default function TabelaPrincipal({ clientes }: TabelaPrincipalProps) {
  return (
    <div className="border border-blue-300 shadow-sm rounded-md ">
      <DataTable
        columns={columns}
        data={clientes}
        searchFields={["nome"]}
        searchPlaceholder={"Buscar por nome..."}
        showHeaders={false}
        showSearch={false}
        renderHeader={({
          globalFilter,
          setGlobalFilter,
          placeholder,
          colSpan,
        }) => (
          <HeaderTabelaPrincipal
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={placeholder}
            colSpan={colSpan}
            clientesAguardandoCount={
              //TODO: Refatorar filtro
              clientes.filter((cliente) => cliente.status === 1).length
            }
          />
        )}
      />
    </div>
  );
}
