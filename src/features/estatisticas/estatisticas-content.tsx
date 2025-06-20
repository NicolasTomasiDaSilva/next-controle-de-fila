import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

export default function EstatisticasContent() {
  return (
    <div>
      <div className="flex flex-col">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Clientes Chamados
            </CardTitle>
            <UserCheck className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="flex items-center mt-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                12% do total
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
