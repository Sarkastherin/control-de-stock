import type { Route } from "../../+types/home";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Productos" },
    { name: "description", content: "Productos" },
  ];
}

export default function Dashboard() {
  return (
    <>
    <h2 className="text-xl font-semibold">Productos</h2>
    <div className="mt-10"></div></>
  )
}