import { Section } from "@/components/Section";
import { ConfiguracaoCard } from "@/components/ConfiguracaoCard";
import { MessageCircle, MessageSquare, Monitor, Palette } from "lucide-react";

export default async function FilaPage() {
  return (
    <Section title="Configurações">
      <div className="grid grid-cols-2 gap-3">
        <ConfiguracaoCard
          icone={(cor: string) => {
            return <Palette className={`${cor}`} />;
          }}
          titulo="Customizar aparência"
          texto="Personalize as cores do monitor de exibição para melhorar a experiência visual dos seus clientes."
          className="col-span-2 sm:col-span-1"
          cor="red"
          link="/aparencia"
        />
        <ConfiguracaoCard
          icone={(cor: string) => {
            return <MessageSquare className={`${cor}`} />;
          }}
          titulo="Customizar mensagem"
          texto="Crie mensagens personalizadas no WhatsApp para diferentes situações e melhore a comunicação com seus clientes."
          className="col-span-2 sm:col-span-1"
          cor="purple"
          link="/mensagens"
        />
        <ConfiguracaoCard
          icone={(cor: string) => {
            return <MessageCircle className={`${cor}`} />;
          }}
          titulo="Ativar WhatsApp"
          texto="Vincule seu número para enviar notificações e atualizações da fila diretamente para os clientes."
          className="col-span-2 sm:col-span-1"
          cor="green"
          link="/whatsapp"
        />
        <ConfiguracaoCard
          icone={(cor: string) => {
            return <Monitor className={`${cor}`} />;
          }}
          titulo="Ativar Monitor"
          texto="Crie mensagens personalizadas no WhatsApp para diferentes situações e melhore a comunicação com seus clientes."
          className="col-span-2 sm:col-span-1"
          cor="cyan"
          link="/vinculacao"
        />
      </div>
    </Section>
  );
}
