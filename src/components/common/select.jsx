import React from "react";

const Select = ({ name, error, label, selectedOption, options, onChange }) => {
  const bootstrapOptions = options.map(el =>
    el === selectedOption ? (
      <option key={el} selected>
        {el}
      </option>
    ) : (
      <option key={el}>{el}</option>
    )
  );
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} onChange={onChange}>
        {bootstrapOptions}
      </select>
    </div>
  );
};

export default Select;
