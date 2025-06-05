"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-9xl font-extrabold text-blue-500">404</h1>
      <p className="mt-4 text-xl text-gray-700">Ops! Página não encontrada.</p>
      <p className="mt-2 text-gray-500">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition"
      >
        Voltar para Home
      </Link>
    </main>
  );
}
