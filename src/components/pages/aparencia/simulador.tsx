interface SimuladorProps {
  scale: number;
  width: number;
  height: number;
  url: string;
}

export default function Simulador({
  scale,
  width,
  height,
  url,
}: SimuladorProps) {
  return (
    <div className="mx-auto bg-red-500">
      <div
        className="overflow-hidden border shadow rounded"
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
        }}
      >
        <iframe
          key={url}
          src={url}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
