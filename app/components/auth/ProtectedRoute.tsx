import { useSession } from "~/context/SessionContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);
  if (loading) return <div>Cargando sesión...</div>;
  return <>{children}</>;
}
