import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <NavLink className="navbar-brand" to="#">
        Vidoop
      </NavLink>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link active" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
