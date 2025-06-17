import type { Metadata } from "next";

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen h-auto flex flex-col">{children}</div>;
}
