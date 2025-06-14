import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle de Fila",
  description: "Controle de Fila",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className="antialiased bg-gradient-to-t from-blue-100/50 to-transparent"
        suppressHydrationWarning={true}
      >
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
      </body>
    </html>
  );
}
