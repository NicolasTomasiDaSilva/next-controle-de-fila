import TabelaPrincipal from "@/components/pages/fila/TabelaPrincipal/TabelaPrincipal";
import { Section } from "@/components/Section";

import filaData from "@/data/fila-data";
import { filaService } from "@/services/fila-service";
import { AdicionarClienteDialog } from "@/components/pages/fila/TabelaPrincipal/AdicionarClienteDialog";
import { FilaProvider } from "@/contexts/fila-context";
import { Fila } from "@/models/fila";
import TabelaRecentes from "@/components/pages/fila/TabelaRecentes/TabelaRecentes";
import { empresaService } from "@/services/empresa-service";
import { Empresa } from "@/models/empresa";
import { EmpresaProvider } from "@/contexts/empresa-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default async function FilaPage() {
  const empresa: Empresa = await empresaService.obterEmpresa();

  return (
    <EmpresaProvider empresaInicial={empresa}>
      <Section title="Vinculação Monitor">
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-max-md mx-auto">
            <CardHeader>
              <CardTitle>Vincular Monitor</CardTitle>
              <CardDescription>
                Siga o passo a passo para vincular seu monitor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-bold">1.</span> Acesse o link do monitor:
                https://example.com
              </p>
              <p>
                <span className="font-bold">2.</span> Insira o CPF ou CNPJ no
                campo de texto
              </p>
              <p>
                <span className="font-bold">3.</span> Insira o código de 4
                dígitos ou escaneie o QR Code
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Button variant="outline">
                  <QrCode />
                </Button>
                <Input></Input>
              </div>
              <Button className="ml-autoblock ">Vincular</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </EmpresaProvider>
  );
}
