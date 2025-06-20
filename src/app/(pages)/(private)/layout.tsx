import Header from "@/features/shared/components/header";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="espaco-lateral-conteudo pt-25 pb-25"> {children}</div>
    </>
  );
}
