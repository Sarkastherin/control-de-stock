import type { Route } from "../../+types/home";
import { Button } from "~/components/Buttons";
import { ConfigTable } from "~/components/ConfigTable";
import { useState, useMemo } from "react";
import { capitalize } from "~/utils/utils";
import type { UnitsType, FamiliesType } from "lib/dataTypes";
import { useData } from "~/context/DataContext";
import { unitsAPI, familiesAPI } from "lib/crud";
import type { ConfigItem } from "~/types/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Movimientos" },
    { name: "description", content: "Stock Movement" },
  ];
}

type AllConfigTypes = ConfigItem<UnitsType> | ConfigItem<FamiliesType>;
export default function Settings() {
  const { units, families } = useData();
  const [activeTab, setActiveTab] = useState("unidades");

  const itemsConfiguraciones = useMemo<AllConfigTypes[]>(() => [
    {
      title: "unidades",
      columns: [
        { name: "Id", selector: row => row.id, width: "80px" },
        { name: "Descripción", selector: row => row.descripcion },
        { name: "Abreviatura", selector: row => row.abreviatura, width: "250px" },
      ],
      data: units,
      formFields: [
        { name: "descripcion", label: "Descripción", type: "text", required: true },
        { name: "abreviatura", label: "Abreviatura", type: "text", required: true },
      ],
      method: unitsAPI,
    },
    {
      title: "familias",
      columns: [
        { name: "Id", selector: row => row.id, width: "80px" },
        { name: "Descripción", selector: row => row.descripcion },
      ],
      data: families,
      formFields: [
        { name: "descripcion", label: "Descripción", type: "text", required: true },
      ],
      method: familiesAPI,
    },
    
  ], [units, families]);

  return (
    <div>
      <nav className="flex gap-4">
        {itemsConfiguraciones.map(cfg => (
          <Button
            key={cfg.title}
            type="button"
            onClick={() => setActiveTab(cfg.title)}
            variant={activeTab === cfg.title ? "primary" : "success"}
            className="w-full"
          >
            {capitalize(cfg.title)}
          </Button>
        ))}
      </nav>

      <div className="flex-1 py-4 mx-auto pe-10">
        {itemsConfiguraciones.map(item =>
          activeTab === item.title && (
            <ConfigTable
              key={item.title}
              title={capitalize(item.title)}
              columns={item.columns}
              data={item.data}
              formFields={item.formFields}
              method={item.method}
            />
          )
        )}
      </div>
    </div>
  );
}
