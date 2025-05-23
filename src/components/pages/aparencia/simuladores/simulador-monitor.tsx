"use client";

interface SimuladorMonitorProps {
  width?: number;
  height?: number;
  scale?: number;
  src: string; // página a ser simulada
}

export function SimuladorMonitor({
  width = 1920,
  height = 1080,
  scale = 0.3,
  src,
}: SimuladorMonitorProps) {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100 flex items-center justify-center p-4">
      <div
        style={{
          width: width * scale,
          height: height * scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "hidden",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <iframe
          src={src}
          width={width}
          height={height}
          style={{ border: "none", pointerEvents: "none" }}
        />
      </div>
    </div>
  );
}
