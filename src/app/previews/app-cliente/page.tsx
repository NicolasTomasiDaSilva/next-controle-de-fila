import AppClientePreview from "@/features/customizacao-aparencia/components/app-cliente-preview/app-cliente-content";

export default async function AppClientePreviewPage() {
  return (
    <AppClientePreview
      configuracao={{
        corPrimaria: "#000000",
        corSobreposicao: "#ffffff",
        nomeDisplay: "Nome Fantasia",
        enderecoDisplay: "Endereço",
        logoUrl: null,
      }}
    ></AppClientePreview>
  );
}
