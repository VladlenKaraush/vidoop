import React from "react";
import { Link } from "react-router-dom";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieDetail extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  componentDidMount() {
    const movie = getMovie(this.props.match.params.id);
    movie.genre = movie.genre.name;
    const genres = getGenres().map(el => el.name);
    this.setState({ data: movie, genres });
    console.log(genres);
  }

  render() {
    return (
      <div>
        <h1>Movie Form {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", true)}
          {this.renderSelect(
            "genre",
            "Genre",
            this.state.genres,
            this.state.data.genre
          )}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}

          <Link to="/movies">{this.renderButton("Save")}</Link>
        </form>
      </div>
    );
  }
}

export default MovieDetail;
