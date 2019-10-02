import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container" style={{ paddingTop: 50 }}>
        <Switch>
          <Route path="/movies/:id" component={MovieDetail} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
