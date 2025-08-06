import type { Route } from "../+types/home";
import { Card } from "~/components/Card";
import { Button } from "~/components/Buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Dashboard" },
    { name: "description", content: "Dashboard" },
  ];
}

export default function Dashboard() {
  return (
    
        <div className="mt-10 mx-auto max-w-xl">
          
        </div>
      
  );
}
