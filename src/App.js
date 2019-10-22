import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logoutPage";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ignore) {}
  }
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="container" style={{ paddingTop: 50 }}>
          <Switch>
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
