import React from "react";
import _ from "lodash";

const TableBody = props => {
  const { data, columns } = props;

  const renderCell = (item, col) => {
    if (col.content) {
      return col.content(item);
    }
    return _.get(item, col.path);
  };

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(col => (
            <td key={col.label || col.key}>{renderCell(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
