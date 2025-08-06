import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Movimientos" },
    { name: "description", content: "Stock Movement" },
  ];
}

export default function Dashboard() {
  return (
    <h1>Movimientos</h1>
  )
}
