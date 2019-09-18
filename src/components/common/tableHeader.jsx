import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    let sort = { ...this.props.sorting };
    if (this.props.sorting.col === path) {
      // reverse order if columm is the same
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.col = path;
    }
    this.props.handleSort(sort);
  };

  sortIcon = col => {
    if (this.props.sorting.col !== col) {
      return null;
    }
    return this.props.sorting.order === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };

  render() {
    const tds = this.props.columns.map(col => (
      <th
        className="clickable"
        key={col.label || col.key}
        onClick={() => this.raiseSort(col.path)}
      >
        {col.label} {this.sortIcon(col.path)}
      </th>
    ));
    return (
      <thead>
        <tr>{tds}</tr>
      </thead>
    );
  }
}

export default TableHeader;
