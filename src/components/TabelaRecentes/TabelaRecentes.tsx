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

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFila } from "@/hooks/use-fila";
import { normalizeString } from "@/utils/normalize-string";
import { Input } from "../ui/input";

export default function TabelaRecentes() {
  const { fila, setFila } = useFila();
  const [searchTerm, setSearchTerm] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  useLayoutEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      scrollEl.scrollTop = lastScrollTop.current;
    }
  });

  const clientesFiltrados = useMemo(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      lastScrollTop.current = scrollEl.scrollTop;
    }

    return fila.clientes
      .filter((cliente) => cliente.status !== StatusEnum.Aguardando)
      .filter((cliente) =>
        normalizeString(cliente.nome).includes(normalizeString(searchTerm))
      )
      .sort((a, b) => {
        const dateA = new Date(a.dataHoraAlterado).getTime();
        const dateB = new Date(b.dataHoraAlterado).getTime();
        return dateB - dateA; // crescente. use dateB - dateA pra ordem decrescente
      });
  }, [fila.clientes, searchTerm]);

  return (
    <div className="border shadow-sm rounded-md overflow-hidden bg-muted/100">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Recentes</th>
          </tr>
        </thead>
      </table>
      <div className="max-h-50 overflow-y-auto" ref={scrollContainerRef}>
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
