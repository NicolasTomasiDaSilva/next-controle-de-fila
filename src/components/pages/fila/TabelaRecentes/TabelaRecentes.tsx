"use client";

import { StatusEnum, StatusLabel } from "@/enums/status-enum";
import ClienteRowTable from "../ClienteRowTabela";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFila } from "@/hooks/use-fila";
import { normalizeString } from "@/utils/normalize-string";
import { Input } from "../../../ui/input";
import { ArrowUp, CircleArrowUp, MoveVertical, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TabelaRecentes() {
  const [parent] = useAutoAnimate();
  const { fila } = useFila();

  const clientesFiltrados = useMemo(() => {
    return fila.clientes
      .filter((cliente) => cliente.status !== StatusEnum.Aguardando)
      .sort((a, b) => {
        const dateA = new Date(a.dataHoraAlterado).getTime();
        const dateB = new Date(b.dataHoraAlterado).getTime();
        return dateB - dateA; // crescente. use dateB - dateA pra ordem decrescente
      });
  }, [fila.clientes]);

  return (
    <Card className="w-full border  p-0 overflow-hidden gap-0">
      <div className="bg-gray-100 shadow-sm flex items-center gap-2 px-4">
        <span className="font-semibold whitespace-nowrap py-3">Recentes</span>
      </div>

      {clientesFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <Users className="w-8 h-8 mb-2 text-gray-400" />
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
