// routes/confirm-email.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "~/context/SessionContext";
import { Card } from "~/components/Card";

export default function ConfirmEmail() {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="mt-10">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            ¡Confirma tu correo!
          </h1>
          <p className="max-w-md">
            Te hemos enviado un correo con un enlace de verificación. Haz clic
            en ese enlace para activar tu cuenta.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            ¿Ya verificaste? <br />
            <span className="font-medium text-primary-light">
              Recarga esta página
            </span>{" "}
            o{" "}
            <a href="/login" className="font-medium text-primary-light">
              vuelve a iniciar sesión
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  );
}
