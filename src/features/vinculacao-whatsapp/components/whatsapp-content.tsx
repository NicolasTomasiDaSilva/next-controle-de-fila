import CardInstrucoesWhatsapp from "./card-instrucoes-whatsapp";
import CardVincularWhatsapp from "./card-vincular-whatsapp";

export default function WhatsAppContent() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      <div className="flex-1">
        <CardInstrucoesWhatsapp></CardInstrucoesWhatsapp>
      </div>
      <div className="flex-1">
        <CardVincularWhatsapp></CardVincularWhatsapp>
      </div>
    </div>
  );
}
