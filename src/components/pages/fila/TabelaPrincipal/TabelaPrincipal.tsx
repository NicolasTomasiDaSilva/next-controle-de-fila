"use client";
import { StatusEnum } from "@/enums/status-enum";
import ClienteRowTable from "../ClienteRowTabela";
import React, { useMemo, useRef, useState } from "react";
import { useFila } from "@/hooks/use-fila";
import { normalizeString } from "@/utils/normalize-string";
import { Input } from "../../../ui/input";
import { ArrowUp, MoveVertical, Users } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TabelaPrincipal() {
  const [tabelaExpandida, setTabelaExpandida] = useState(false);
  const { fila } = useFila();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function goToTop() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  function expandirTabela() {
    setTabelaExpandida((prev) => !prev);
  }

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
            <th className="flex flex-row items-center py-2 px-4 py-2 shadow-sm justify-between">
              <div className="flex flex-row items-center gap-2 text-left">
                <Users className="size-4 shrink-0 text-blue-600" />
                <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                  <span className="hidden md:inline">Na Fila: </span>
                  {totalAguardando}
                </span>
                <Input
                  placeholder="Pesquisar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm bg-white focus-visible:ring-[1px]"
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={goToTop}
                  className="text-black-600 hover:text-black-700 transition md:order-2 cursor-pointer"
                >
                  <ArrowUp className="w-7 h-7" />
                </button>
                <button
                  onClick={expandirTabela}
                  className="text-black-600 hover:text-black-700 transition md:order-2 cursor-pointer"
                >
                  <MoveVertical className="w-7 h-7" />
                </button>
              </div>
            </th>
          </tr>
        </thead>
      </table>
      <div
        className={`overflow-y-auto transition-all duration-300 ${
          tabelaExpandida ? "max-h-none" : "max-h-96"
        }`}
        ref={scrollContainerRef}
      >
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
                <td className="flex items-center justify-center h-[200px] text-gray-500">
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
