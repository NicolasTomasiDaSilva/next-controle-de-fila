"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { EstatisticasFilaDTO } from "../models/estatisticas-fila";

interface CardDistribuicaoStatusProps {
  estatisticasFila: EstatisticasFilaDTO;
}
export default function CardDistribuicaoStatus({
  estatisticasFila,
}: CardDistribuicaoStatusProps) {
  const data = [
    {
      name: "Chamados",
      clientes: estatisticasFila.quantidadeClientesChamados,
      color: "#22c55e",
    },
    {
      name: "Desistentes",
      clientes: estatisticasFila.quantidadeClientesDesistentes,
      color: "#eab308",
    },
    {
      name: "Não Compareceram",
      clientes: estatisticasFila.quantidadeClientesAusentes,
      color: "#f97316",
    },
    {
      name: "Removidos",
      clientes: estatisticasFila.quantidadeClientesRemovidos,
      color: "#ef4444",
    },
  ];
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="mr-2 inline" />
          Distribuição de Status
        </CardTitle>
        <CardDescription>
          Proporção de clientes por status de atendimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 25, left: 25, bottom: 75 }}
            >
              <XAxis
                dataKey="name"
                interval={0}
                tick={{
                  fontSize: 12,
                  fill: "#334155", // cor do texto
                  fontWeight: "bold",
                  dy: 10, // deslocamento vertical
                }}
                angle={-45} // rotaciona 45 graus
                textAnchor="end" // alinha o texto à direita para ficar legível
              />

              <Tooltip />
              <Bar dataKey="clientes">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
