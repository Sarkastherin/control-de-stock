import type { Route } from "../../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Empresa" },
    { name: "description", content: "Configuración de Empresa" },
  ];
}

export default function Company() {
    return (
        <h1>Datos de la empresa</h1>
    )
}