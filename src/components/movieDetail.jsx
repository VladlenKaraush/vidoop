import React from "react";
import { Link } from "react-router-dom";

const MovieDetail = props => {
  return (
    <div>
      <h1>Movie Form {props.match.params.id}</h1>
      <Link to="/movies">
        <button className="btn btn-primary">Save</button>
      </Link>
    </div>
  );
};

export default MovieDetail;
