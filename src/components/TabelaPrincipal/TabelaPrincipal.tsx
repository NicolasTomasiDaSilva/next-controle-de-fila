"use client";
import { Cliente } from "@/models/cliente";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

import { StatusEnum, StatusLabel } from "@/enums/status-enum";
import ClienteRowTable from "../shared/ClienteRowTabela";
import React, { useMemo, useState } from "react";
import { useFila } from "@/hooks/use-fila";
import { normalizeString } from "@/utils/normalize-string";
import { Input } from "../ui/input";
import { Users } from "lucide-react";

export default function TabelaPrincipal() {
  const { fila, setFila } = useFila();
  const [searchTerm, setSearchTerm] = useState("");
  const clientesFiltrados = useMemo(() => {
    return fila.clientes
      .filter((cliente) => cliente.status === StatusEnum.Aguardando)
      .filter((cliente) =>
        normalizeString(cliente.nome).includes(normalizeString(searchTerm))
      )
      .sort((a, b) => {
        if (a.posicao === null && b.posicao === null) return 0;
        if (a.posicao === null) return 1;
        if (b.posicao === null) return -1;
        return a.posicao - b.posicao;
      });
  }, [fila.clientes, searchTerm]);

  const totalAguardando = useMemo(() => {
    return fila.clientes.filter((c) => c.status === StatusEnum.Aguardando)
      .length;
  }, [fila.clientes]);

  return (
    <div className="border border-blue-300 shadow-sm rounded-md overflow-hidden ">
      <table className="w-full table-auto bg-blue-50 ">
        <thead>
          <tr>
            <th className="flex items-center py-2 gap-2 px-4 py-2 text-left border-b ">
              <Users className="size-4 shrink-0 text-blue-600" />
              <span className="text-sm font-bold text-blue-600">
                Na Fila: {totalAguardando}
              </span>
              <Input
                placeholder="Pesquisar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-white focus-visible:ring-[1px]"
              />
            </th>
          </tr>
        </thead>
      </table>
      <div className="max-h-90 overflow-y-auto">
        <table className="w-full table-auto">
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente, i) => (
                <tr key={cliente.id} className="border-b">
                  <ClienteRowTable cliente={cliente} />
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center text-gray-500 py-6">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
