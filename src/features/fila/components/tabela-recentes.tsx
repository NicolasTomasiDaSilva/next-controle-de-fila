"use client";

import { StatusEnum } from "@/enums/status-enum";
import ClienteRowTable from "./cliente-row-tabela";

import React, { useMemo } from "react";
import { useFila } from "@/features/fila/hooks/use-fila";

import { Users } from "lucide-react";
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
        const getRelevantDate = (cliente: typeof a) => {
          return new Date(cliente.dataHoraAlterado).getTime();
        };

        const dateA = getRelevantDate(a);
        const dateB = getRelevantDate(b);
        return dateB - dateA; // decrescente
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
