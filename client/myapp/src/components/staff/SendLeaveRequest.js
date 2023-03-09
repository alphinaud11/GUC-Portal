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

class SendLeaveRequest extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: false,
            expired: false,
            type: "annual",
            absentDate: "",
            compensationDate: "",
            reason: "",
            replacers: "",
            documents: ""
        }
    }

    handleSelect = (event) => {
        this.setState({
            type: event
          });
    }

    handleChange1 = (event) => {
        this.setState({
            absentDate: event.target.value
          });
    }

    handleChange2 = (event) => {
        this.setState({
            compensationDate: event.target.value
          });
    }

    handleChange3 = (event) => {
        this.setState({
            reason: event.target.value
          });
    }

    handleChange4 = (event) => {
        this.setState({
            replacers: event.target.value
          });
    }

    handleChange5 = (event) => {
        this.setState({
            documents: event.target.value
          });
    }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.type === "annual") {
        if (this.state.absentDate === "") {
            alert("You have to provide an absence date");
          }
          else {
            axios
            .post(
              "http://localhost:3000/sendAnnualRequest",
              {
                date: this.state.absentDate,
                reason: this.state.reason,
                replacers: [this.state.replacers]
              },
              {
                headers: { "auth-token": this.state.token }
              }
            )
            .then((response) => {
                if (response.data === "input is not valid" || response.data === "Can only submit an annual request before the targeted day" || response.data === "You do not have enough annual balance" || response.data === "You are not authorized to do this functionality") {
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
    else if (this.state.type === "accidental") {
        if (this.state.absentDate === "") {
            alert("You have to provide an absence date");
          }
          else {
            axios
            .post(
              "http://localhost:3000/sendAccidentalRequest",
              {
                date: this.state.absentDate,
                reason: this.state.reason
              },
              {
                headers: { "auth-token": this.state.token }
              }
            )
            .then((response) => {
                if (response.data === "input is not valid" || response.data === "You have consumed all six days for accidental leaves" || response.data === "You do not have enough annual balance" || response.data === "You are not authorized to do this functionality") {
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
    else if (this.state.type === "sick") {
        if (this.state.absentDate === "" || this.state.documents === "") {
            if (this.state.absentDate === "") {
                alert("You have to provide an absence date");
              }
              else if (this.state.documents === "") {
                alert("Proper documents should be submitted");
              }
          }
          else {
            axios
            .post(
              "http://localhost:3000/sendSickRequest",
              {
                date: this.state.absentDate,
                reason: this.state.reason,
                documents: [this.state.documents]
              },
              {
                headers: { "auth-token": this.state.token }
              }
            )
            .then((response) => {
                if (response.data === "input is not valid" || response.data === "You have to provide proper documents" || response.data === "Can only submit a sick request by maximum three days after the sick day" || response.data === "You are not authorized to do this functionality") {
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
    else if (this.state.type === "maternity") {
        if (this.state.absentDate === "" || this.state.documents === "") {
            if (this.state.absentDate === "") {
                alert("You have to provide an absence date");
              }
              else if (this.state.documents === "") {
                alert("Proper documents should be submitted");
              }
          }
          else {
            axios
            .post(
              "http://localhost:3000/sendMaternityRequest",
              {
                date: this.state.absentDate,
                reason: this.state.reason,
                documents: [this.state.documents]
              },
              {
                headers: { "auth-token": this.state.token }
              }
            )
            .then((response) => {
                if (response.data === "input is not valid" || response.data === "Only female staff can submit maternity leave requests" || response.data === "You have to provide proper documents" || response.data === "You are not authorized to do this functionality") {
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
    else if (this.state.type === "compensation") {
        if (this.state.absentDate === "" || this.state.compensationDate === "" || this.state.reason === "") {
            if (this.state.absentDate === "") {
                alert("You have to provide an absence date");
              }
              else if (this.state.compensationDate === "") {
                alert("You have to provide a compensation date");
              }
              else if (this.state.reason === "") {
                alert("You have to provide a reason");
              }
          }
          else {
            axios
            .post(
              "http://localhost:3000/sendCompensationRequest",
              {
                absentDate: this.state.absentDate,
                compensationDate: this.state.compensationDate,
                reason: this.state.reason
              },
              {
                headers: { "auth-token": this.state.token }
              }
            )
            .then((response) => {
                if (response.data === "input is not valid" || response.data === "You have to provide a reason" || response.data === "You have to attend your day off during the same month which you were absent in" || response.data === "You are not authorized to do this functionality") {
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
      title="Type"
      id="input-group-dropdown-1"
      onSelect={this.handleSelect}
    >
    <Dropdown.Item key="annual" eventKey="annual">Annual</Dropdown.Item>
    <Dropdown.Item key="accidental" eventKey="accidental">Accidental</Dropdown.Item>
    <Dropdown.Item key="sick" eventKey="sick">Sick</Dropdown.Item>
    <Dropdown.Item key="maternity" eventKey="maternity">Maternity</Dropdown.Item>
    <Dropdown.Item key="compensation" eventKey="compensation">Compensation</Dropdown.Item>
    </DropdownButton>
  </InputGroup>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Absence Date</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="YYYY-MM-DD"
      aria-label="YYYY-MM-DD"
      aria-describedby="basic-addon2"
      onChange={this.handleChange1}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Compensation Date</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="YYYY-MM-DD"
      aria-label="YYYY-MM-DD"
      aria-describedby="basic-addon2"
      onChange={this.handleChange2}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Reason</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder=""
      aria-label=""
      aria-describedby="basic-addon2"
      onChange={this.handleChange3}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Replacers</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="In case of annual leaves"
      aria-label=""
      aria-describedby="basic-addon2"
      onChange={this.handleChange4}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Document</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Document URL (In case of sick or maternity leaves)"
      aria-label=""
      aria-describedby="basic-addon2"
      onChange={this.handleChange5}
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

export default SendLeaveRequest
