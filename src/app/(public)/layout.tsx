import Header from "@/components/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-row items-center max-w-xl mx-auto">
      {children}
    </div>
  );
}
