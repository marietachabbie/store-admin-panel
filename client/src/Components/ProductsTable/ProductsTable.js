import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "./styles.css";

export default function Table ({ data }) {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Product", accessor: "product" },
      { Header: "Price", accessor: "price"},
      { Header: "Store", accessor: "store" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render((e) => cell.column.Header === "Price" ? "$" + e.value : e.value)}
                    </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
