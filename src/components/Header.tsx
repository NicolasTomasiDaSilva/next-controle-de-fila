import Image from "next/image";
import logo from "@/assets/images/logoTeste.png";
import Menu from "./menu";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full h-20 shadow-sm flex items-center bg-white shadow-blue-100">
      <div className=" w-full flex justify-between espaco-lateral-conteudo items-center">
        <Link href="/fila">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              className="p-2 bg-white border-1 border-gray-400 rounded-md size-9"
              src={logo}
              alt="Logo"
            />
            <span className="text-base sm:text-lg font-semibold">
              Controle de Fila
            </span>
            <Badge className="font-semibold text-sm bg-blue-100 text-blue-600 border border-blue-300">
              Fila
            </Badge>
          </div>
        </Link>
        <Menu />
      </div>
    </header>
  );
}
