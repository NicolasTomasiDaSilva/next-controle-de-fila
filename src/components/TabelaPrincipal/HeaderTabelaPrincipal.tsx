import filaData from "../../data/fila-data";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Users } from "lucide-react";

interface HeaderTabelaPrincipalProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  placeholder: string;
  colSpan: number;
  clientesAguardandoCount: number;
}

export default function HeaderTabelaPrincipal({
  globalFilter,
  setGlobalFilter,
  placeholder,
  colSpan,
  clientesAguardandoCount,
}: HeaderTabelaPrincipalProps) {
  return (
    <TableHeader className="sticky top-0">
      <TableRow className="bg-blue-50 w-full">
        <TableHead colSpan={colSpan}>
          <div className="flex items-center py-2 gap-2">
            <Users className="size-4 shrink-0 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              Na Fila: {clientesAguardandoCount}
            </span>
            <Input
              placeholder={placeholder}
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm bg-white focus-visible:ring-[1px]"
            />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
