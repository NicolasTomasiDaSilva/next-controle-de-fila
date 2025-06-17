import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { mensagensPadraoWhatsapp } from "@/constantes/mensagens-padrao-whatsapp";

import { PenLine, AlertCircle, RotateCcw } from "lucide-react";
import RichTextEditor from "./rich-text-editor";
import { UseFormReturn } from "react-hook-form";
import { MensagensFormDTO } from "@/dtos/configuracao";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { whatsappToHtml } from "@/utils/token-transform";

interface CardEditorMensagensProps {
  tabSelecionada: "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido";
  setTabSelecionada: React.Dispatch<
    React.SetStateAction<
      "mensagemEntrada" | "mensagemChamada" | "mensagemRemovido"
    >
  >;
  form: UseFormReturn<MensagensFormDTO>;
  resetCount: number;
  setResetCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CardEditorMensagens({
  tabSelecionada,
  setTabSelecionada,
  form,
  resetCount,
  setResetCount,
}: CardEditorMensagensProps) {
  const { errors } = form.formState;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="whitespace-nowrap">
          <PenLine className="inline mr-2" />
          Editor Mensagens
        </CardTitle>
        <CardDescription>
          Personalize as mensagens que serão enviadas ao seu cliente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={tabSelecionada}
          onValueChange={(value) =>
            setTabSelecionada(
              value as
                | "mensagemEntrada"
                | "mensagemChamada"
                | "mensagemRemovido"
            )
          }
          className="w-full"
        >
          <TabsList className="mx-auto md:ml-0 h-10 px-2 shadow-sm">
            <TabsTrigger value="mensagemEntrada">
              Entrada
              {errors.mensagemEntrada && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="mensagemChamada">
              Chamada
              {errors.mensagemChamada && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="mensagemRemovido">
              Remoção
              {errors.mensagemRemovido && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mensagemEntrada">
            <FormField
              control={form.control}
              name="mensagemEntrada"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      key={resetCount}
                      limiteCaracteres={500}
                      value={whatsappToHtml(field.value ?? "")}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="mensagemChamada">
            <FormField
              control={form.control}
              name="mensagemChamada"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      key={resetCount}
                      limiteCaracteres={500}
                      value={whatsappToHtml(field.value ?? "")}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="mensagemRemovido">
            <FormField
              control={form.control}
              name="mensagemRemovido"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      key={resetCount}
                      limiteCaracteres={500}
                      value={whatsappToHtml(field.value ?? "")}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => {
            form.reset(mensagensPadraoWhatsapp);
            setResetCount(resetCount + 1);
          }}
          variant={"outline"}
        >
          <RotateCcw />
          Redefinir
        </Button>
      </CardFooter>
    </Card>
  );
}
