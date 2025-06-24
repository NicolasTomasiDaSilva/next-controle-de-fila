"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  ListOrdered,
  LogOut,
  MenuIcon,
  MoreVertical,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/features/autenticacao/hooks/use-logout";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const { logout, isSubmitting } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-9">
          <ChevronDown className="!h-5 !w-5" />
          <User className="!h-5 !w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 sm:w-56 shadow-md rounded-md"
      >
        <Link href="/fila" passHref>
          <DropdownMenuItem className="cursor-pointer hover:!bg-blue-100">
            <ListOrdered className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600">Fila</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/configuracoes" passHref>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:!bg-red-100"
          onClick={logout}
          disabled={isSubmitting}
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span className="text-red-600">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
