import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import GenresList from "./common/genresList";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageLimit: 4,
    page: 1,
    activeGenre: "All genres",
    sorting: { col: "title", order: "asc" },
    query: ""
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ genres, movies });
  }

  moviesLeftBanner = moviesToRender => {
    return moviesToRender.length > 0 ? (
      <h2>{moviesToRender.length} movies in the database</h2>
    ) : (
      <h2>There are no movies left!</h2>
    );
  };

  handleDeleteById = async id => {
    const allMovies = this.state.movies;
    const updatedMovies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies: updatedMovies });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("movie is already deleted");
        toast.error("this movie has already been deleted");
      } else {
        this.setState({ movies: allMovies });
      }
    }
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
    this.setState({ activeGenre, page: 1, query: "" });
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

  searchMovies = movies => {
    const { query } = this.state;
    if (!query) return movies;
    return movies.filter(el =>
      el.title.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  inputQueryChange = e => {
    this.setState({ query: e.currentTarget.value, page: 1 });
  };

  render() {
    const filteredMovies = this.filterByGenre(this.state.movies);
    const sortedMovies = _.orderBy(
      filteredMovies,
      [this.state.sorting.col],
      [this.state.sorting.order]
    );
    const searchedMovies = this.searchMovies(sortedMovies);
    const paginatedMovies = this.paginateMovies(searchedMovies);
    const { user } = this.props;

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
            {user && (
              <Link
                className="btn btn-primary"
                to="movies/new"
                style={{ marginBottom: 20 }}
              >
                New
              </Link>
            )}
            {this.moviesLeftBanner(searchedMovies)}
            <SearchBox
              query={this.state.query}
              inputQueryChange={this.inputQueryChange}
            />
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
              moviesTotal={searchedMovies.length}
              pageSize={this.state.pageLimit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
