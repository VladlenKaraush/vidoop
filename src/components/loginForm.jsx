import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import httpService from "../services/httpService";
import { auth } from "../services/userService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    console.log("Form submission");
    //call server

    try {
      const { data: token } = await auth(this.state.data);
      console.log(token);
    } catch (ex) {
      if (ex.response && ex.response === 400) {
        toast.error("400 bad request");
        console.log(ex.response);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
