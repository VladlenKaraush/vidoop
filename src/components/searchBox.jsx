import React from "react";

const SearchBox = props => {
  return (
    <input
      className="form-control"
      style={{ marginBottom: 20 }}
      value={props.query}
      onChange={props.inputQueryChange}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
