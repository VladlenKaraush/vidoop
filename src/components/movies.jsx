import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import GenresList from "./common/genresList";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageLimit: 4,
    page: 1,
    activeGenre: "All genres",
    sorting: { col: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({ genres: getGenres(), movies: getMovies() });
  }

  moviesLeftBanner = moviesToRender => {
    return moviesToRender.length > 0 ? (
      <h2>{moviesToRender.length} movies in the database</h2>
    ) : (
      <h2>There are no movies left!</h2>
    );
  };

  handleDeleteById = id => {
    const updatedMovies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies: updatedMovies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const ind = movies.indexOf(movie);
    movies[ind].liked = !movies[ind].liked;
    this.setState({ movies });
  };

  handlePagination = page => {
    this.setState({ page });
  };

  handleGenreChange = activeGenre => {
    this.setState({ activeGenre, page: 1 });
  };

  handleSort = sorting => {
    this.setState({ sorting });
  };

  moviesTable = moviesToRender => {};

  filterByGenre = movies => {
    return this.state.activeGenre === "All genres"
      ? movies
      : movies.filter(movie => movie.genre.name === this.state.activeGenre);
  };

  paginateMovies = movies => {
    return paginate(movies, this.state.page, this.state.pageLimit);
  };

  render() {
    const filteredMovies = this.filterByGenre(this.state.movies);
    const sortedMovies = _.orderBy(
      filteredMovies,
      [this.state.sorting.col],
      [this.state.sorting.order]
    );
    const paginatedMovies = this.paginateMovies(sortedMovies);
    return (
      <div>
        <div className="row"></div>

        <div className="row">
          <div className="col-2">
            <GenresList
              genres={this.state.genres}
              genre={this.state.activeGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <Link
              className="btn btn-primary"
              to="movies/new"
              style={{ marginBottom: 20 }}
            >
              New
            </Link>
            {this.moviesLeftBanner(filteredMovies)}
            <MoviesTable
              moviesOnPage={paginatedMovies}
              handleDeleteById={this.handleDeleteById}
              handleLike={this.handleLike}
              handleSort={this.handleSort}
              sorting={this.state.sorting}
            />
            <Pagination
              onClick={this.handlePagination}
              active={this.state.page}
              moviesTotal={filteredMovies.length}
              pageSize={this.state.pageLimit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
