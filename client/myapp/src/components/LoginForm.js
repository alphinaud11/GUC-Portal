import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Redirect } from "react-router-dom"

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      role : ""
    };
  }
  handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", this.state)
      .then((response) => {
        const msg = response.data.token;
        const staffRole = response.data.role;
        console.log(msg);
        console.log(staffRole);
        localStorage.setItem(
          "login",
          JSON.stringify({
            isLoggedIn: true,
            token: msg,
            role : staffRole
          })
        );
        this.setState({
          isLoggedIn: true,
          role : staffRole
        })
      })
      .catch((err) => console.log(alert(err.response.data)));
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  renderedPage = () =>{
    let s = ""
    if(this.state.role === "HR"){
      s = "/hr"
    }
    else{
      s = "/staff"
    }
    return s
  }
  render() {
    //console.log(this.state.role)
    //console.log(this.state.token)
    const inputStyles = {
      width: "70%",
      margin: "auto",
    };
    const labelStyles = {
      fontSize: "200%",
      fontFamily : "'Libre Baskerville', serif"
      //textDecoration : "underline"
    };
    return (
      <div>
        {this.state.isLoggedIn === false ? (
          <Form
            style={{ marginTop: "10%", width: "60%", marginLeft: "20%", backgroundColor:"#e3b76b"}}
            className="text-center border border-success rounded p-5"
            onSubmit={this.handleLogin}
          >
            <Form.Group controlId="formBasicUsername">
              <Form.Label style={labelStyles}>Username:</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                style={inputStyles}
                name="username"
                value={this.state.username}
                type="text"
                placeholder="Enter username"
                size="lg"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={labelStyles}>Password:</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                style={inputStyles}
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Enter password"
                size="lg"
              />
            </Form.Group>
            <Button
              style={{ fontSize: "20px", width: "30%" }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        ) : (
          <Redirect to= {this.renderedPage()}  />
        )}
      </div>
    );
  }
}

export default LoginForm;
