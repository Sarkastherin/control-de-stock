import type { Route } from "../../+types/home";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { Card } from "~/components/Card";
import { Button } from "~/components/Buttons";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { customStyles } from "~/utils/tableProps";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Productos" },
    { name: "description", content: "Productos" },
  ];
}
type ViewCategorizationProps = {
  description_category: string;
  description_family: string;
  description_subcategory: string;
  id_category: number;
  id_family: number;
  id_subcategory: number;
};
type ProductsTableProps = {
  id: string;
  description: string;
  view_categorizations: ViewCategorizationProps;
};
const columns: TableColumn<ProductsTableProps>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Descripcion",
    selector: (row) => row.description,
  },
  {
    name: "Sub-rubro",
    selector: (row) => row.view_categorizations.description_subcategory,
    width: "250px",
  },
  {
    name: "Rubro",
    selector: (row) => row.view_categorizations.description_category,
    width: "250px",
  },
  {
    name: "Familia",
    selector: (row) => row.view_categorizations.description_family,
    width: "250px",
  },
];

createTheme("dark", {
  background: {
    default: "transparent",
  },
});
createTheme("light", {
  background: {
    default: "transparent",
  },
});

const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
export function EmptyStateProductos() {
  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <ArchiveBoxXMarkIcon className="w-28 text-primary-light"/>
      <h2 className="text-xl font-semibold mb-2">Aún no hay productos</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Crea tu primer producto o importa una lista desde Excel.
      </p>
      <div className="flex gap-3">
        <Button className="" variant="primary">Crear producto</Button>
        <Button className="btn-secondary">Importar</Button>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <>
      <h2 className="text-xl font-semibold">Productos</h2>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={[]}
          pagination
          paginationPerPage={15}
          noDataComponent={<EmptyStateProductos />}
          pointerOnHover
          highlightOnHover
          customStyles={customStyles}
          paginationComponentOptions={options}
          theme="dark"
        />
      </div>
    </>
  );
}
