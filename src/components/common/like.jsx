import React from "react";

const Like = props => {
  let iconClass = "fa fa-heart-o";
  if (props.favorite) {
    iconClass += "fa fa-heart";
  }
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={iconClass}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
