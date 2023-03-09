import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom"
import axios from "axios";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      oldPassword: "",
      newPassword: "",
      isLoading: true,
      expired: false,
      reset : false
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleReset = (event) => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:3000/resetPassword",
        {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.removeItem("login")
        this.setState({
          reset : true 
        })
        alert(response.data);
      })
      .catch((err) => {
        alert(err.response.data);
        if (err.response.data === "Invalid Token") {
          alert("Your credentials are expired, login again")
          this.setState({
            expired: true,
          });
        }
      });
  };

  render() {
    const inputStyles = {
      width: "70%",
      margin: "auto",
    };
    const labelStyles = {
      fontSize: "200%",
      fontFamily: "'Libre Baskerville', serif",
      //textDecoration : "underline"
    };
    console.log(
      this.state.oldPassword,
      this.state.newPassword,
      this.state.token
    );
    return this.state.expired === true || this.state.reset === true ? (
      <Redirect to="/login" />
    ) : (
      <Form
        style={{
          marginTop: "10%",
          width: "60%",
          marginLeft: "20%",
          backgroundColor: "#e3b76b",
        }}
        className="text-center border border-success rounded p-5"
        onSubmit={this.handleReset}
      >
        <Form.Group controlId="formBasicPassword1">
          <Form.Label style={labelStyles}>Old Password:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="oldPassword"
            value={this.state.oldPassword}
            type="password"
            placeholder="Enter old password"
            size="lg"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
          <Form.Label style={labelStyles}>New Password:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="newPassword"
            value={this.state.newPassword}
            type="password"
            placeholder="Enter new password"
            size="lg"
          />
        </Form.Group>
        <Button
          style={{ fontSize: "20px", width: "30%" }}
          variant="danger"
          type="submit"
        >
          Reset Password
        </Button>
      </Form>
    );
  }
}

export default ResetPassword;
