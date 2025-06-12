import { ConfiguracaoFormDTO } from "@/dtos/configuracao";
import { Dot } from "lucide-react";

interface CardDescricaoProps {
  valores: ConfiguracaoFormDTO;
}

const descricao = [
  "Você receberá uma notificação quando chegar a sua vez",
  "Após ser chamado, concedemos o tempo de tolerância de até 10 minutos",
  "Você pode cancelar sua reserva a qualquer momento",
];

export const CardDescricao = ({ valores }: CardDescricaoProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mt-6 ">
      <div className="flex-col ">
        <h4 className="text-base font-semibold pl-2">Enquanto você espera</h4>
        <ul className="mt-2 text-gray-600 text-xs space-y-2 ">
          {descricao.map((texto, index) => (
            <li key={index} className="flex flex-row items-center">
              <div className="w-7 flex justify-center items-start">
                <Dot
                  size={30}
                  style={{
                    color: valores?.corPrimaria ?? "#000000",
                  }}
                />
              </div>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
