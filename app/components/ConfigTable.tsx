import { useState } from "react";
import { Button } from "./Buttons";
import type { TableColumn } from "react-data-table-component";
import { TableComponent } from "./Tables";
import { ConfigFormModal } from "./modals/ConfigFormModal";
import type { CrudMethod } from "lib/crudFactory";
import { useUI } from "~/context/UIContext";
import type { FormField } from "~/types/config";
import { useConfigRealTime } from "lib/realTime";

type Props<T extends { id: string }> = {
  title: string;
  columns: TableColumn<T>[];
  formFields: FormField<T>[];
  data: T[] | undefined;
  method: CrudMethod<T>;
};

export const ConfigTable = <T extends { id: string }>({
  title,
  columns,
  formFields,
  data,
  method,
}: Props<T>) => {
  useConfigRealTime();
  const { /* theme, */ showModal } = useUI();
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  function handleAdd() {
    setSelected(null);
    setOpen(true);
  }
  const handleOnRowClicked = (row: T) => {
    setSelected(row);
    setOpen(true);
  };
  const actionColumn: TableColumn<T> = {
    name: "🗑️",
    button: true,
    cell: (row) => (
      <Button
        variant="error"
        size="md"
        onClick={(e) => {
          e.stopPropagation(); // evita que se dispare el onRowClicked
          handleDelete(row);
        }}
      >
        Eliminar
      </Button>
    ),
    width: "90px",
  };

  async function handleDelete(row: T) {
    const ok = confirm("¿Eliminar este registro?");
    if (!ok) return;
    try {
      showModal({
        variant: "loading",
        title: "⏳ Un momento...",
        bodyModal: (
          <p>
            Estamos eliminando el elemento. 🛠️
            <br />
            No cierres esta ventana hasta que finalice el proceso.
          </p>
        ),
      });
      const { error } = await method.remove({ id: row.id });
      if (error) throw new Error(String(error));
      setSelected(null);
      showModal({
        variant: "success",
        title: "✅ ¡Listo!",
        bodyModal: (
          <p>
            Los datos se guardaron correctamente. 🎉 <br />
            Puedes continuar en el Dashboard.
          </p>
        ),
        footer: {
          btnPrimary: {
            label: "Aceptar",
            handleOnClick: () => console.log("Close modal"),
            variant: "success",
          },
        },
      });
    } catch (e) {
      console.error(e);
      showModal({
        title: "❌ Algo salió mal...",
        bodyModal: (
          <>
            <p>
              No pudimos completar la operación. 😞
              <br />
              Revisa los datos ingresados o intenta nuevamente.
            </p>
            <code>{String(e)}</code>
          </>
        ),
        variant: "error",
      });
    }
  }

  return (
    <>
      {data && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="primary" onClick={handleAdd}>
              + Agregar
            </Button>
          </div>
          {data.length > 0 && (
            <TableComponent
              columns={[...columns, actionColumn]}
              data={data}
              theme="dark"
              pagination
              onRowClicked={handleOnRowClicked}
            />
          )}
          {data.length === 0 && (
            <>
              <p className="text-gray-500">No hay datos disponibles.</p>
              <Button variant="primary" onClick={handleAdd}>
                + Agregar
              </Button>
            </>
          )}
          {formFields && (
            <ConfigFormModal<T>
              open={open}
              onClose={() => {
                setOpen(false);
                setSelected(null);
              }}
              title={
                selected ? "Editar Configuración" : "Agregar Configuración"
              }
              fields={formFields}
              initialValues={selected}
              method={method}
            />
          )}
        </div>
      )}
    </>
  );
};
