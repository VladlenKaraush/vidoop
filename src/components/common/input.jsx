import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  const inputClassName = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className={inputClassName} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
