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
import { AdicionarClienteDialog } from "./AdicionarClienteDialog";

interface TabelaPrincipalProps {
  clientes: Cliente[];
  searchFields?: string[];
}

export default function TabelaPrincipal({ clientes }: TabelaPrincipalProps) {
  return (
    <>
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
