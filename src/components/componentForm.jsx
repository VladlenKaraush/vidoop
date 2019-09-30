import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username === "") {
      errors.username = "Username required";
    }
    if (account.password === "") {
      errors.password = "Password required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(e);
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Form submission");
  };

  handleInput = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="UserName"
            autoFocus
            handleInput={this.handleInput}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            handleInput={this.handleInput}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
