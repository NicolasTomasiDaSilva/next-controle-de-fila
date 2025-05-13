import Header from "@/components/Header";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <h1>Private Layout</h1>
      {children}
    </div>
  );
}
