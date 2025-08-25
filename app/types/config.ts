// types/config.ts
import type { TableColumn } from "react-data-table-component";
import type { CrudMethod } from "lib/crudFactory";
import type { Path } from "react-hook-form";

export type FormField<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "boolean" | "select";
  required?: boolean;
  options?: { value: string | number; label: string }[];
};

export type ConfigItem<T> = {
  title: string;
  columns: TableColumn<T>[];
  data: T[] | undefined;
  formFields: FormField<T>[];
  method: CrudMethod<T>;
};
