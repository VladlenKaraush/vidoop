import React from "react";
import { Link } from "react-router-dom";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

class MovieDetail extends Form {
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

  constructor(props) {
    super(props);
    this.state = {
      data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
      genres: [],
      errors: {}
    };
    const movie = getMovie(props.match.params.id);
    if (!movie) {
      this.state.redirect = true;
    } else {
      movie.genre = movie.genre.name;
      delete movie._id;
      this.state.data = movie;
      this.state.genres = getGenres().map(el => el.name);
    }
  }

  doSubmit = () => {
    // save movie change
  };

  render() {
    console.log(this.state.redirect);
    return this.state.redirect ? (
      <Redirect to="/not-found" />
    ) : (
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
