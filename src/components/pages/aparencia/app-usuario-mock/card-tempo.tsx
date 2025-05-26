interface CardTempoProps {
  icon: React.ReactNode;
  titulo: string;
  subtitulo: string;
  valor: string;
}

export function CardTempo({ icon, titulo, subtitulo, valor }: CardTempoProps) {
  return (
    <div className="flex justify-between items-center  p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-row items-center gap-2 ">
        <div className="bg-white p-2 rounded-lg">{icon}</div>
        <div className="flex flex-col items-start ">
          <h1 className="font-semibold">{titulo}</h1>
          <p className="text-xs text-gray-600">{subtitulo}</p>
        </div>
      </div>
      <div className="flex flex-row items-end font-bold">
        <h1 className="text-xl">{valor}</h1>
      </div>
    </div>
  );
}
