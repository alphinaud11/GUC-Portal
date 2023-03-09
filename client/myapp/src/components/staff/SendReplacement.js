import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from "react-router-dom"
import axios from "axios";

class SendReplacement extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: false,
            expired: false,
            date: "",
            slots: [],
            slotSelected: "",
            recipients: [],
            recipientSelected: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            date: event.target.value
          });
    }

    handleSelect1 = (event) => {
        event.preventDefault();
        axios
      .post(
        "http://localhost:3000/viewSlotsOnDate",
        {
          date: this.state.date
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
          if (response.data === "date is not valid" || response.data === "Date can not be today" || response.data === "Date must not be before today" || response.data === "You are not authorized to do this functionality") {
            alert(response.data);
          }
          else {
            this.setState({
                slots: response.data
              });
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

    handleSelect2 = (event) => {
      this.setState({
          slotSelected: event
        });
        axios
      .post(
        "http://localhost:3000/viewStaffInCourse",
        {
          course: this.state.slots[event].course
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
          if (response.data === "course is not valid" || response.data === "You are not authorized to do this functionality") {
            alert(response.data);
          }
          else {
            this.setState({
                recipients: response.data
              });
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

  handleSelect3 = (event) => {
      this.setState({
          recipientSelected: event
        });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.date === "" || this.state.slotSelected === "" || this.state.recipientSelected === "") {
      alert("You have to select a date, a slot and a recipient");
    }
    else {
      axios
      .post(
        "http://localhost:3000/sendReplacement",
        {
          senderDate: this.state.date,
          course: this.state.slots[this.state.slotSelected].course,
          start: this.state.slots[this.state.slotSelected].start,
          end: this.state.slots[this.state.slotSelected].end,
          location: this.state.slots[this.state.slotSelected].location,
          recipient: this.state.recipients[this.state.recipientSelected]
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

    <Form.Group controlId="formGridAddress2">
    <Form.Label>Date</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="YYYY-MM-DD"
      aria-label="YYYY-MM-DD"
      aria-describedby="basic-addon2"
      onChange={this.handleChange}
    />
    <InputGroup.Append>
      <Button variant="success" onClick={this.handleSelect1}>Select</Button>
    </InputGroup.Append>
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Slots"
      id="input-group-dropdown-1"
      onSelect={this.handleSelect2}
    >
    {this.state.slots.map((slot, index) => {
      return <Dropdown.Item key={index} eventKey={index}>{"Course: " + slot.course + " | Location: " + slot.location + " | Start: " + slot.start + " | End: " + slot.end}</Dropdown.Item>
    })}
    </DropdownButton>
  </InputGroup>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Staff"
      id="input-group-dropdown-2"
      onSelect={this.handleSelect3}
    >
      {this.state.recipients.map((recipient, index) => {
      return <Dropdown.Item key={index} eventKey={index}>{recipient}</Dropdown.Item>
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

export default SendReplacement
