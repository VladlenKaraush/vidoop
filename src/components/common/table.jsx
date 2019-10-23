import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const { data, columns, handleSort, sorting } = props;
  console.log("table cols: ", columns);
  return data.length === 0 ? null : (
    <div className="container">
      <table className="table ">
        <TableHeader
          columns={columns}
          handleSort={handleSort}
          sorting={sorting}
        />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
