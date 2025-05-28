export default function CentralizaConteudoPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center px-4"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {children}
    </div>
  );
}
