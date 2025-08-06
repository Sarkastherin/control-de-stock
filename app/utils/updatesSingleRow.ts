import type { UpdateorDeleteResponse } from "lib/crudFactory";
export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;

type Props<T extends { id: string }> = {
  dirtyFields: DirtyMap<T>;
  formData: T;
  onUpdate: (args: {
    id: string;
    values: Partial<T>;
  }) => Promise<UpdateorDeleteResponse>;
};

export const updateSingleRow = async <T extends { id: string }>({
  dirtyFields,
  formData,
  onUpdate,
}: Props<T>) => {
  const updatePayload = Object.entries(dirtyFields).reduce(
    (acc, [key, isDirty]) => {
      if (isDirty) {
        acc[key as keyof T] = formData[key as keyof T];
      }
      return acc;
    },
    {} as Partial<T>
  );

  if (Object.keys(updatePayload).length === 0) return;
  if(!formData.id) {throw new Error("El objeto formData no tiene id válido.")}
  const { error } = await onUpdate({
    id: formData.id,
    values: updatePayload,
  });

  if (error)
    throw new Error(
      `No se pudo actualizar la fila. Error: ${String(error.message)}`
    );
  
};
