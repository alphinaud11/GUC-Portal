import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
class StaffProfile extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      gender: "",
      imgPath: "",
      displayName: "",
      isLoading: true,
      expired: false,
      salary: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/viewProfile", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        const res = response.data;
        let salaryComputed = res.salary - (res.missingDays*(res.salary/60));
        if (res.missingMinutes > 179) {
          const missingHours = Math.floor(res.missingMinutes / 60);
          const missingMinutes = res.missingMinutes % 60;
          salaryComputed -= ((missingHours*(res.salary/180)) + (missingMinutes*(res.salary/10800)));
        }
        this.setState({
          gender: res.gender,
          imgPath: res.imgPath,
          displayName: res.displayName,
          isLoading: false,
          salary: salaryComputed
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
    //console.log(this.state.token);
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) : this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
      <Container className="text-center mt-4">
        <img
          src={this.state.imgPath}
          style={{ width: "70%" }}
          className="rounded mx-auto d-block mt-5 mb-3"
          alt=""
        />
        <h1>
          Display Name:{" "}
          <Badge variant="danger">{this.state.displayName.toUpperCase()}</Badge>
        </h1>
        <h1>
          Gender:{" "}
          <Badge variant="danger">{this.state.gender.toUpperCase()}</Badge>
        </h1>
        <h1>
          Salary:{" "}
          <Badge variant="danger">{this.state.salary}</Badge>
        </h1>
      </Container>
    );
  }
}

export default StaffProfile;
