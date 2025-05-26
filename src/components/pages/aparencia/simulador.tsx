import { useEffect, useRef, useState } from "react";

interface SimuladorProps {
  url: string;
  width: number;
  height: number;
  fixedHeight?: number; // altura fixa para simular telefone alinhado
}

export default function Simulador({
  url,
  width,
  height,
  fixedHeight,
}: SimuladorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  return <div></div>;
}
