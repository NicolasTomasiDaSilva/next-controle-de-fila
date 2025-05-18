"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-md p-2 
                     focus:outline-none focus-visible:ring-0 cursor-pointer"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Administrativo</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 sm:w-56 shadow-md rounded-md"
      >
        <Link href="/configuracoes" passHref>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
