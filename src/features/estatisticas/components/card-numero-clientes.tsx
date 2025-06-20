import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cor } from "@/lib/constants/section-cores";
import { pegarCorPorStatus, StatusEnum } from "@/lib/enums/status-enum";
import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";
import { JSX } from "react";

interface CardNumeroClientesProps {
  quantidade: number;
  portcentagem: number;
  titulo: string;
  status: StatusEnum;
  icone: (className: string) => JSX.Element;
}

export default function CardNumeroClientes({
  portcentagem,
  quantidade,
  status,
  titulo,
  icone,
}: CardNumeroClientesProps) {
  const cor: Cor = pegarCorPorStatus(status);
  return (
    <Card className={cn("border-l-4", cor.border)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {titulo}
        </CardTitle>
        {icone(cn(cor.text, "h-6 w-6"))}
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", cor.text)}>{quantidade}</div>
        <div className="flex items-center mt-2">
          <Badge variant="secondary" className={cn(cor.text, cor.bg)}>
            {portcentagem.toFixed(1)}% do total
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
