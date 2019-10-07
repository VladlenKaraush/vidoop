import React from "react";

const Select = ({ name, error, label, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option></option>
        {options.map(el => (
          <option key={el._id} value={el._id}>
            {el.name}
          </option>
        ))}
      </select>
      {error && <div className="alert-alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
