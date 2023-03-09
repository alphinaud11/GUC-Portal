import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { Redirect } from "react-router-dom"
import axios from "axios";

class SendChangeDayOff extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: false,
            expired: false,
            day: "",
            reason: ""
        }
    }

    handleSelect = (event) => {
        this.setState({
            day: event
          });
    }

    handleChange = (event) => {
        this.setState({
            reason: event.target.value
          });
    }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.day === "") {
      alert("You have to select a day");
    }
    else {
      axios
      .post(
        "http://localhost:3000/sendChangeDayOff",
        {
          day: this.state.day,
          reason: this.state.reason
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
          if (response.data === "input is not valid" || response.data === "You are not authorized to do this functionality") {
            alert(response.data);
          }
          else {
            alert("Request submitted successfully");
          }
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
            <div style={{marginLeft:"25px", marginTop:"25px"}}>
            
    <Form onSubmit={this.handleSubmit}>

    <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Day"
      id="input-group-dropdown-1"
      onSelect={this.handleSelect}
    >
    <Dropdown.Item key="Saturday" eventKey="Saturday">Saturday</Dropdown.Item>
    <Dropdown.Item key="Sunday" eventKey="Sunday">Sunday</Dropdown.Item>
    <Dropdown.Item key="Monday" eventKey="Monday">Monday</Dropdown.Item>
    <Dropdown.Item key="Tuesday" eventKey="Tuesday">Tuesday</Dropdown.Item>
    <Dropdown.Item key="Wednesday" eventKey="Wednesday">Wednesday</Dropdown.Item>
    <Dropdown.Item key="Thursday" eventKey="Thursday">Thursday</Dropdown.Item>
    </DropdownButton>
  </InputGroup>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Reason</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder=""
      aria-label=""
      aria-describedby="basic-addon2"
      onChange={this.handleChange}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>

</Form>
            </div>
        )
    }
}

export default SendChangeDayOff
