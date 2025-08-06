import type { Route } from "../../+types/root";
import {
  useNavigate,
  Form,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { useSession } from "~/context/SessionContext";
import { useEffect } from "react";
import { supabase } from "lib/supabaseClient";
import { Input } from "~/components/Inputs";
import { Button } from "~/components/Buttons";
import { Card } from "~/components/Card";
import { AnchorLink } from "~/components/auth/AnchorLink";
import ButtonGoogle from "~/components/auth/ButtonGoogle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registro" },
    { name: "description", content: "Crear cuenta en StockAR" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/confirm-email`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export default function Register() {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [loading, user, navigate]);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
        <h2 className="mt-10 text-center text-2xl font-semibold tracking-tight">
          Crear una cuenta
        </h2>
      </div>

      <Card>
        <div className="login-container">
          <Form method="post" className="flex flex-col gap-6">
            <Input
              label="Correo Electrónico"
              placeholder="micorreo@ejemplo.com"
              type="email"
            />
            <Input label="Contraseña" type="password" />
            <Button type="submit" disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? "Ingresando..." : "Entrar"}
            </Button>
            <ButtonGoogle />
            {actionData?.error && <p className="error">{actionData.error}</p>}
          </Form>
          <div className="mt-4 text-center">
            <AnchorLink
              href="/login"
              text="¿Ya tienes cuenta?"
              labelLink="Iniciar sesión"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
