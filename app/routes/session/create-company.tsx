import type { Route } from "../+types/home";
import ProtectedRoute from "~/components/auth/ProtectedRoute";
import FormCompany from "~/templates/FormCompany";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Crear Empresa" },
    { name: "description", content: "Crear Empresa" },
  ];
}

export default function Company() {
  return (
    <ProtectedRoute>
      <FormCompany mode="create"/>
    </ProtectedRoute>
  );
}
