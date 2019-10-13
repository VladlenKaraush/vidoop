import React from "react";

const GenresList = props => {
  return (
    <ul className="list-group">
      <li
        className={
          props.genre === "All genres"
            ? "list-group-item active"
            : "list-group-item"
        }
        style={{ cursor: "pointer" }}
        onClick={() => props.onGenreChange("All genres")}
      >
        All genres
      </li>
      {props.genres &&
        props.genres.map(genre => (
          <li
            key={genre.name}
            className={
              props.genre === genre.name
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => props.onGenreChange(genre.name)}
          >
            {genre.name}
          </li>
        ))}
    </ul>
  );
};

GenresList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default GenresList;
