import { MessageCircle, MessageSquare, Monitor, Palette } from "lucide-react";
import { ConfiguracaoCard } from "./configuracao-card";

export default function ConfiguracoesContent() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ConfiguracaoCard
        icone={(cor: string) => {
          return <Palette className={`${cor}`} />;
        }}
        titulo="Customização Aparência"
        texto="Personalize as cores do monitor e site de acompanhamento para melhorar a experiência visual dos seus clientes"
        className="col-span-2 sm:col-span-1"
        cor="red"
        link="/aparencia"
      />
      <ConfiguracaoCard
        icone={(cor: string) => {
          return <MessageSquare className={`${cor}`} />;
        }}
        titulo="Customização Mensagens"
        texto="Crie mensagens personalizadas no WhatsApp para diferentes situações e melhore a comunicação com seus clientes"
        className="col-span-2 sm:col-span-1"
        cor="purple"
        link="/mensagens"
      />
      <ConfiguracaoCard
        icone={(cor: string) => {
          return <MessageCircle className={`${cor}`} />;
        }}
        titulo="Vinculação WhatsApp"
        texto="Vincule seu número do WhatsApp para enviar notificações de atualizações da fila diretamente para seus clientes"
        className="col-span-2 sm:col-span-1"
        cor="green"
        link="/whatsapp"
      />
      <ConfiguracaoCard
        icone={(cor: string) => {
          return <Monitor className={`${cor}`} />;
        }}
        titulo="Vinculação Monitor"
        texto="Vincule seu monitor para exibir informações da fila para seus clientes"
        className="col-span-2 sm:col-span-1"
        cor="cyan"
        link="/vinculacao"
      />
    </div>
  );
}
