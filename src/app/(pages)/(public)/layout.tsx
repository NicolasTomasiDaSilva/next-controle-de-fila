export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "espaco-lateral-conteudo min-h-screen flex flex-row items-center mx-auto !max-w-120"
      }
    >
      {children}
    </div>
  );
}
