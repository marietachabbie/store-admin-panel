import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import "./styles.css";

export default function StoresTable ({ data }) {
  const categoryMap = data.reduce((acc, curr) => {
    acc[curr.category] = curr.category_id;
    return acc;
  }, {})

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Category", accessor: "category" ?? "None"}
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
                      {cell.render((e) => cell.column.Header === "Category" ?
                        <Link to={{ pathname: "/products/" + e.value }} state={{Data: { category_id: categoryMap[e.value] }}}>{e.value}</Link>
                        : e.value)}
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
