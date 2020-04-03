import React from 'react';
import '../stylesheets/Login.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.redirectOnLogin = this.redirectOnLogin.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleLogin() {
    let email = this.state.email;
    let password = this.state.password;
    // http://localhost:5000/api/account/login/?email=jon@gmail.com&password=1234
    const res = await axios.get("http://localhost:5000/api/account/login?" + 'email=' + email + '&password=' + password);
    if (res.data.length > 0){
      console.log(res.data);
      localStorage.setItem('profileID', res.data[0].id);
      localStorage.setItem('firstname', res.data[0].firstname);
      localStorage.setItem('email', res.data[0].email);
      this.setState({redirect: true});
    }
    else {
      alert('INVALID CREDENTIALS');
    }
  }

  redirectOnLogin() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/home",
            // state: { username: this.state.username }
          }}
        />
      );
    }
  }
  

  render() {
    // console.log(this.state.email);
    // console.log(this.state.password);
    return (
      <Container component="main" maxWidth="xs">
        {this.redirectOnLogin()}
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handlePasswordChange}
          />
          <Button
            variant="contained"
            onClick={this.handleLogin}
          >
            Sign In
          </Button>
        </form>
      </Container>
    );
  }
}

export default Login;