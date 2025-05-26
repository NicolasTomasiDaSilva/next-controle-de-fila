interface SimuladorProps {
  url: string;
  width: number;
  height: number;
  scale: number;
  maxPreviewHeight: number;
}

export default function Simulador({
  url,
  width,
  height,
  scale,
  maxPreviewHeight,
}: SimuladorProps) {
  return (
    <div
      className=" overflow-hidden"
      style={{
        width: width * scale,
        height: maxPreviewHeight,
        position: "relative",
      }}
    >
      <iframe
        src={url}
        width={width}
        height={height}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          border: "none",
        }}
      />
    </div>
  );
}
