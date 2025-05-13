import { filaService } from "@/services/fila-service";

type FilaPageProps = {
  params: { filaId: string };
};

export default async function FilaPage({ params }: FilaPageProps) {
  const { filaId } = params;

  try {
    const fila = await filaService.obterFilaPorId(filaId);
  } catch (error) {
    console.error("Erro ao carregar fila:", error);
    // Opcional: você pode retornar uma mensagem de erro ou redirecionar
  }

  return (
    <div>
      <h1>PÁGINA FILA</h1>
    </div>
  );
}
