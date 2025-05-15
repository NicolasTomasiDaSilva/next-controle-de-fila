"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-9xl font-extrabold text-blue-500">😞</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-700">
        Ocorreu um erro
      </h2>
      <p className="mt-2 text-gray-500 max-w-md text-center">
        Algo deu errado ao carregar esta página. Tente novamente.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition"
      >
        Tentar novamente
      </button>
    </main>
  );
}
