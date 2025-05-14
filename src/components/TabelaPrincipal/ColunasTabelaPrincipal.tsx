import { StatusEnum, StatusLabel } from "@/enums/status-enum";
import { Cliente } from "@/models/cliente";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleArrowDown, CircleArrowUp, Phone, Trash } from "lucide-react";

const ColunasTabelaPrincipal: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
];
export default ColunasTabelaPrincipal;
