import React from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

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

  doSumbit = () => {
    console.log("Form submission");
    //call server
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="UserName"
            autoFocus
            handleChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            handleChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
