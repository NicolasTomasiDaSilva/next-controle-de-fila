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
import { useFila } from "@/hooks/use-fila";

export default function TabelaPrincipal() {
  const { fila, setFila } = useFila();
  const clientesAguardando: Cliente[] = fila.clientes
    .filter((cliente) => cliente.status === StatusEnum.Aguardando)
    .sort((a, b) => {
      if (a.posicao === null && b.posicao === null) return 0;
      if (a.posicao === null) return 1; // nulls vão para o final
      if (b.posicao === null) return -1;
      return a.posicao - b.posicao; // ordenação normal
    });

  return (
    <>
      <div className="border border-blue-300 shadow-sm rounded-md">
        <DataTable
          columns={ColunasTabelaPrincipal}
          data={clientesAguardando}
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
              clientesAguardandoCount={clientesAguardando.length}
            />
          )}
          renderRow={(row) => <ClienteRowTable key={row.id} row={row} />}
        />
      </div>
    </>
  );
}
