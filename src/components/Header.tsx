import Image from "next/image";
import logo from "@/assets/images/logoTeste.png";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="bg-white w-full h-20 shadow-sm flex justify-between items-center px-5 sm:px-10 md:px-15 lg:px-20">
      <div className="flex items-center gap-2">
        <Image
          className="p-2 bg-white border-1 border-gray-400 rounded-md size-9"
          src={logo}
          alt="Logo"
        />
        <span className="text-base sm:text-lg font-semibold">
          Controle de Fila
        </span>
      </div>
      <Menu />
    </header>
  );
}
