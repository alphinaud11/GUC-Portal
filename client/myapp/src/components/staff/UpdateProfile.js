import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";
import axios from "axios";

class UpdateProfile extends Component {
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
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/viewProfile", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        const res = response.data;
        this.setState({
          gender: res.gender,
          imgPath: res.imgPath,
          displayName: res.displayName,
          isLoading: false,
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
  handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:3000/updateProfile",
        {
          gender: this.state.gender,
          displayName: this.state.displayName,
          imgPath: this.state.imgPath,
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => console.log(err));
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    console.log(this.state.token);
    const inputStyles = {
      width: "70%",
      margin: "auto",
    };
    const labelStyles = {
      fontSize: "200%",
      fontFamily: "'Libre Baskerville', serif",
      //textDecoration : "underline"
    };
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) : this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
      <Form
        style={{
          marginTop: "5%",
          width: "60%",
          marginLeft: "20%",
          backgroundColor: "#e3b76b",
        }}
        className="text-center border border-success rounded p-5"
        onSubmit={this.handleUpdate}
      >
        <Form.Group controlId="formBasicImage">
          <Form.Label style={labelStyles}>Image Path/Url:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="imgPath"
            value={this.state.imgPath}
            type="text"
            placeholder="Enter image Url"
            size="lg"
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label style={labelStyles}>Display Name:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="displayName"
            value={this.state.displayName}
            type="text"
            placeholder="Enter display name"
            size="lg"
          />
        </Form.Group>
        <Form.Group controlId="formBasicGender">
          <Form.Label style={labelStyles}>Gender:</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="gender"
            value={this.state.gender}
            type="text"
            placeholder="Enter gender"
            size="lg"
          />
        </Form.Group>

        <Button
          style={{ fontSize: "20px", width: "30%" }}
          variant="success"
          type="submit"
        >
          Update
        </Button>
      </Form>
    );
  }
}

export default UpdateProfile;
