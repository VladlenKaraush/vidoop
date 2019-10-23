import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      key: "title",
      content: movie => <Link to={"/movies/" + movie._id}> {movie.title} </Link>
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: movie => (
        <Like
          favorite={movie.liked}
          onClick={() => this.props.handleLike(movie)}
        />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.handleDeleteById(movie._id)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

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

  render() {
    return (
      <Table
        data={this.props.moviesOnPage}
        columns={this.columns}
        handleSort={this.props.handleSort}
        sorting={this.props.sorting}
      />
    );
  }
}

export default MoviesTable;
