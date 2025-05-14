"use client";
import { Cliente } from "@/models/cliente";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import HeaderTabelaPrincipal from "./HeaderTabelaPrincipal";
import { StatusEnum, StatusLabel } from "@/enums/status-enum";
import ClienteRowTable from "../shared/ClienteRowTabela";
import ColunasTabelaPrincipal from "./ColunasTabelaPrincipal";
import React from "react";
import { Button } from "../ui/button";

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

interface TabelaPrincipalProps {
  clientes: Cliente[];
  searchFields?: string[];
}

export default function TabelaPrincipal({ clientes }: TabelaPrincipalProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <Button
        className="bg-white mb-4 border border-gray-400 text-black shadow hover:bg-blue-500 hover:text-white cursor-pointer px-2 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base sm:w-[30%] sm:ml-auto"
        onClick={() => {}}
      >
        + Adicionar à fila
      </Button>
      <div className="border border-blue-300 shadow-sm rounded-md   ">
        <DataTable
          columns={ColunasTabelaPrincipal}
          data={clientes}
          searchFields={["nome"]}
          searchPlaceholder={"Buscar por nome..."}
          showSearch={true}
          showHeaders={true}
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
                clientes.filter((cliente) => cliente.status === 1).length
              }
            />
          )}
          renderRow={(row) => <ClienteRowTable key={row.id} row={row} />}
        />
      </div>
    </>
  );
}
