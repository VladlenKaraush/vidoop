import React from "react";

const SearchBox = props => {
  return (
    <input
      className="form-control my-3"
      value={props.query}
      onChange={props.inputQueryChange}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
