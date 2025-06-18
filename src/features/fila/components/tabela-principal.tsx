"use client";
import { StatusEnum } from "@/lib/enums/status-enum";
import ClienteRowTable from "./cliente-row-tabela";
import React, { useMemo, useRef, useState } from "react";

import { normalizeString } from "@/lib/utils/normalize-string";

import { Users } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useFila } from "@/features/fila/hooks/use-fila";
import { Input } from "@/components/ui/input";

export default function TabelaPrincipal() {
  const { fila } = useFila();
  const [searchTerm, setSearchTerm] = useState("");
  const [parent] = useAutoAnimate();

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
    <Card className="w-full  border border-blue-300 p-0 overflow-hidden gap-0">
      <div className="bg-blue-50 shadow-sm flex items-center gap-2 py-2 px-4">
        <Users className="size-4 shrink-0 text-blue-600" />
        <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
          {totalAguardando}
        </span>
        <Input
          placeholder="Pesquisar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-white focus-visible:ring-[1px]"
        />
      </div>

      {clientesFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <Users className="w-8 h-8 mb-2 text-blue-400" />
          <p className="text-sm font-medium">Nenhum cliente encontrado</p>
        </div>
      ) : (
        <div ref={parent}>
          {clientesFiltrados.map((cliente) => (
            <div key={cliente.id}>
              <ClienteRowTable cliente={cliente} />
              <Separator />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
