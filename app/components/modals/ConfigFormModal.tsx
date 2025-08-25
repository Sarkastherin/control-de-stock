import { ModalComponent } from "./ModalComponent";
import type { DefaultValues, Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input, Select } from "../Inputs";
import type { CrudMethod } from "lib/crudFactory";
import { useUI } from "~/context/UIContext";
import { useEffect } from "react";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import type { DirtyMap } from "~/utils/updatesSingleRow";
import { useSession } from "~/context/SessionContext";

type Field<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "boolean" | "select";
  required?: boolean;
  options?: { value: string | number; label: string }[];
};

type Props<T extends { id: string }> = {
  open: boolean;
  fields: Field<T>[];
  onClose: () => void;
  initialValues: DefaultValues<T>;
  method: CrudMethod<T>;
  title: string;
};

export function ConfigFormModal<T extends { id: string }>({
  open,
  fields,
  initialValues,
  method,
  title,
  onClose,
}: Props<T>) {
    const { profile } = useSession();
  const { showModal } = useUI();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<T>({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onSubmit = async (data: T) => {
    try {
      showModal({
        variant: "loading",
        title: "⏳ Un momento...",
        bodyModal: (
          <p>
            Estamos guardando los datos. 🛠️
            <br />
            No cierres esta ventana hasta que finalice el proceso.
          </p>
        ),
      });
      if (initialValues?.id) {
        await updateSingleRow<T>({
          dirtyFields: dirtyFields as DirtyMap<T>,
          formData: data,
          onUpdate: method.update,
        });
      } else {
        if (!profile) throw new Error("No hay perfil de usuario");
        const payload = {
          ...data,
          empresa_id: profile.empresa_id ,
        };
        const { error } = await method.insert(payload);
        if (error) throw new Error(error.message);
      }
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
            handleOnClick: () => onClose(),
            variant: "success",
          },
        },
      });
    } catch (e) {
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
    } finally {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <ModalComponent
      open={open}
      title={title}
      onClose={() => {
        onClose();
        reset();
      }}
      footer={{
        btnPrimary: {
          label: "Guardar",
          handleOnClick: handleSubmit(onSubmit),
        },
        btnSecondary: {
          label: "Cancelar",
          handleOnClick: () => {
            onClose();
            reset();
          },
        },
      }}
    >
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((f) => (
          <div key={f.name}>
            {f.type === "text" && (
              <Input
                label={f.label}
                {...register(f.name, { required: f.required })}
              />
            )}

            {f.type === "boolean" && (
              <label className="inline-flex gap-2 text-sm items-center">
                <input type="checkbox" {...register(f.name)} />
                {f.label}
              </label>
            )}

            {f.type === "select" && (
              <>
                <label
                  htmlFor={f.name}
                  className="block text-sm font-medium mb-1"
                >
                  {f.label}
                </label>
                <Select
                  {...register(f.name, { required: f.required })}
                  defaultValue=""
                >
                  <option value="">— Seleccionar —</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </>
            )}
          </div>
        ))}
      </form>
    </ModalComponent>
  );
}
