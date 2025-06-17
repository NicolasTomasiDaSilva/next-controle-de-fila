import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-t from-blue-100/50 to-transparent">
      {children}
      <Toaster
        visibleToasts={2}
        position="top-right"
        duration={1000}
        richColors // cores automáticas para success/error/etc
        expand={true} // abre toasts com descrição mais largos
        closeButton // adiciona botão de fechar
        toastOptions={{
          classNames: {
            toast: "rounded-xl shadow-lg border",
            title: "text-base font-semibold",
            description: "text-sm opacity-90",
          },
        }}
      />
    </div>
  );
}
