import { StatusEnum, StatusLabel } from "@/enums/status-enum";
import { Cliente } from "@/models/cliente";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const ColunasTabelaPrincipal: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "observacao",
    header: "Observação",
  },
  {
    accessorKey: "dataHoraCriado",
    header: "Entrada",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Ações",
  },
];
export default ColunasTabelaPrincipal;
