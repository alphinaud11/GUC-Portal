import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom"
import axios from "axios";

class StaffSignOut extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      signInMsg: "",
      expired : false
    };
  }
  componentDidMount() {
    axios
      .put(
        "http://localhost:3000/signOutFromCampus",
        {},
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {
        this.setState({
          isLoading: false,
          signOutMsg: response.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data === "Invalid Token") {
          alert("Your credentials are expired, login again")
          this.setState({
            expired: true,
          });
        }
      });
  }
  render() {
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) : this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
      <h1 className="display-1 text-center mt-5">{this.state.signOutMsg}</h1>
    );
  }
}

export default StaffSignOut;
