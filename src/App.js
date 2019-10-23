import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logoutPage";
import auth from "./services/authService";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }
  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={user} />
        <div className="container" style={{ paddingTop: 50 }}>
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieDetail} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
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
