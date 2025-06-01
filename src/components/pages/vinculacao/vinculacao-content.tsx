import CardInstrucoesVinculacao from "./card-instrucoes-vinculacao";
import CardVincularVinculacao from "./card-vincular-vinculacao";

export default function VinculacaoContent() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      <CardInstrucoesVinculacao></CardInstrucoesVinculacao>
      <CardVincularVinculacao></CardVincularVinculacao>
    </div>
  );
}
