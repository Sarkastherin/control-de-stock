import { supabase } from "lib/supabaseClient";
import type { ButtonHTMLAttributes } from "react";
type ButtonGoogleProps = ButtonHTMLAttributes<HTMLButtonElement>;
export default function ButtonGoogle({ ...buttonProps }: ButtonGoogleProps) {
  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:5173/dashboard`,
      },
    });

    if (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      // Podés mostrar un toast o mensaje si querés
    }
  };
  return (
    <button
      className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-border rounded text-sm font-medium dark:hover:bg-gray-600/30 duration-150 active:bg-gray-700 cursor-pointer"
      {...buttonProps}
      onClick={handleGoogleAuth}
    >
      <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
      Continúa con Google
    </button>
  );
}
