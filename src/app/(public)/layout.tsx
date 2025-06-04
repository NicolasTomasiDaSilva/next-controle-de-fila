import Header from "@/components/Header";
import { cn } from "@/lib/utils";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "espaco-lateral-conteudo min-h-screen flex flex-row items-center mx-auto !max-w-2xl"
      }
    >
      {children}
    </div>
  );
}
