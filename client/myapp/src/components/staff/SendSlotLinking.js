import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from "react-router-dom"
import axios from "axios";

class SendSlotLinking extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: false,
            expired: false,
            courses: [],
            courseSelected: "",
            slots: [],
            slotSelected: ""
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:3000/viewCoursesInDepartment", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        this.setState({
            isLoading: false,
            courses: response.data
          });
    })
    .catch((err) => {
        if (err.response.data === "Invalid Token") {
            alert("Your credentials are expired, login again")
            this.setState({
              expired: true
            });
          }
    });
    }

    handleSelect1 = (event) => {
      this.setState({
          courseSelected: this.state.courses[event].name,
          slots: this.state.courses[event].slots
        });
  }

  handleSelect2 = (event) => {
      this.setState({
          slotSelected: this.state.slots[event]
        });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.courseSelected === "" || this.state.slotSelected === "") {
      alert("You have to select a course and a slot");
    }
    else {
      axios
      .post(
        "http://localhost:3000/sendSlotLinking",
        {
          course: this.state.courseSelected,
          day: this.state.slotSelected.day,
          start: this.state.slotSelected.start,
          end: this.state.slotSelected.end,
          location: this.state.slotSelected.location
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
          if (response.data === "input is not valid" || response.data === "Can not request a slot in your day off" || response.data === "You already have teaching duty at that time" || response.data === "You are not authorized to do this functionality") {
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
      title="Courses"
      id="input-group-dropdown-1"
      onSelect={this.handleSelect1}
    >
    {this.state.courses.map((course, index) => {
      return <Dropdown.Item key={index} eventKey={index}>{course.name}</Dropdown.Item>
    })}
    </DropdownButton>
  </InputGroup>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Slots"
      id="input-group-dropdown-2"
      onSelect={this.handleSelect2}
    >
      {this.state.slots.map((slot, index) => {
      return <Dropdown.Item key={index} eventKey={index}>{"Day: " + slot.day + " | Start: " + slot.start + " | End: " + slot.end + " | Location: " + slot.location}</Dropdown.Item>
    })}
    </DropdownButton>
  </InputGroup>

  <Button variant="primary" type="submit">
    Submit
  </Button>

</Form>
            </div>
        )
    }
}

export default SendSlotLinking
