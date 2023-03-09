import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom"
import axios from "axios";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      msg: "",
      isLoading: true,
    };
  }
  componentDidMount() {
    axios
      .post(
        "http://localhost:3000/logout",
        {},
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {
        localStorage.removeItem("login");
        this.setState({
          isLoading: false,
          msg: response.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : ( 
        <Redirect to= "/login" />
    );
  }
}

export default Logout;

