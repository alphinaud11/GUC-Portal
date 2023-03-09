import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"

class ViewExtraHours extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      extraHours: "",
      extraMinutes: "",
      expired : false
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/viewMissingExtraHours", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          extraHours: response.data.extraHours,
          extraMinutes: response.data.extraMinutes,
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
    ) :this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
      <h1 className="display-1 text-center mt-5">
        You have Extra <span style={{ color: "red" }}>{this.state.extraHours}</span>{" "}
        and <span style={{ color: "red" }}>{this.state.extraMinutes}</span>{" "}
      </h1>
    );
  }
}

export default ViewExtraHours;
