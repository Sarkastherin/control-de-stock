import DataTable, { createTheme } from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
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
const customStyles = {
  headCells: {
    style: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      fontFamily: "sans-serif",
      fontSize: "14px",
    },
  },
};
type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  theme?: "dark" | "light";
  pagination?: boolean;
  onRowClicked?: (row: T) => void;
};
export const TableComponent = <T,>({
  columns,
  data,
  theme,
  pagination = true,
  onRowClicked
}: TableProps<T>) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      theme={theme}
      pagination={pagination}
      onRowClicked={onRowClicked}
      pointerOnHover
      highlightOnHover
    />
  );
};
