import LoginForm from "@/components/LoginForm";
import { Section } from "@/components/Section";

export default async function LoginPage() {
  return (
    <Section className="flex mt-0 pb-0 items-center justify-center min-h-screen">
      <LoginForm></LoginForm>
    </Section>
  );
}
