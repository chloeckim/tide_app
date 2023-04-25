import React, { useMemo } from "react";
import { useTable } from "react-table";
import './TideTable.css';

export const TideTable = props => {

  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Height',
        accessor: 'height',
      },
    ],
    []
  );

  const data = useMemo(
    () => {
      let formatted = [];
      props.data.forEach((item) => {
        formatted.push({
          "height": item.height.toFixed(2),
          "time": item.time.toLocaleTimeString('en-US'),
          "type": item.type
        });
      });
      return formatted;
    },
    [props.data]
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table className="tide-table" {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}