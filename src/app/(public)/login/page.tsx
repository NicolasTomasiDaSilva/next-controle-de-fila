import LoginForm from "@/components/pages/login/LoginForm";
import { Section } from "@/components/Section";

export default async function LoginPage() {
  return (
    <div className="flex mt-0 pb-0 items-center justify-center min-h-screen">
      <LoginForm></LoginForm>
    </div>
  );
}
