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

class ModifyCourseSlot extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: true,
            expired: false,
            courses: [],
            course: "",
            day: "",
            newDay: "",
            start: "",
            end: "",
            newStart: "",
            newEnd: "",
            location: "",
            newLocation: "",
            newTeacher: ""
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:3000/viewCoursesOfCoordinator", {
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

    handleCourse = (event) => {
        this.setState({
            course: event
          });
    }

    handleDay = (event) => {
        this.setState({
            day: event
          });
    }

    handleNewSlotDay = (event) => {
        this.setState({
            newDay: event
          });
    }

    handleStart = (event) => {
        let value = "";
        if (event === "8:15") {
            value = "9:45";
        }
        else if (event === "10:00") {
            value = "11:30";
        }
        else if (event === "11:45") {
            value = "1:15";
        }
        else if (event === "1:45") {
            value = "3:15";
        }
        else if (event === "3:45") {
            value = "5:15";
        }
        this.setState({
            start: event,
            end: value
          });
    }

    handleNewSlotStart = (event) => {
        let value = "";
        if (event === "8:15") {
            value = "9:45";
        }
        else if (event === "10:00") {
            value = "11:30";
        }
        else if (event === "11:45") {
            value = "1:15";
        }
        else if (event === "1:45") {
            value = "3:15";
        }
        else if (event === "3:45") {
            value = "5:15";
        }
        this.setState({
            newStart: event,
            newEnd: value
          });
    }

    handleLocation = (event) => {
        this.setState({
            location: event.target.value
          });
    }

    handleNewLocation = (event) => {
        this.setState({
            newLocation: event.target.value
          });
    }

    handleNewTeacher = (event) => {
        this.setState({
            newTeacher: event.target.value
          });
    }

  handleAdd = (event) => {
    event.preventDefault();
    if (this.state.course === "" || this.state.day === "" || this.state.start === "" || this.state.end === "" || this.state.location === "") {
      alert("You have to select a course, a day, a slot start time and a location");
    }
    else {
      axios
      .post(
        "http://localhost:3000/addCourseSlot",
        {
          courseName: this.state.course,
          day: this.state.day,
          start: this.state.start,
          end: this.state.end,
          location: this.state.location
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
        alert(response.data);
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

  handleUpdate = (event) => {
    event.preventDefault();
    if (this.state.course === "" || this.state.day === "" || this.state.start === "" || this.state.location === "") {
      alert("You have to select a course, a day, a slot start time and a location to identify which slot you wish to update");
    }
    else {
      axios
      .post(
        "http://localhost:3000/updateCourseSlot",
        {
          courseName: this.state.course,
          oldLocation: this.state.location,
          oldSlotDay: this.state.day,
          oldSlotStart: this.state.start,
          newTeacher: this.state.newTeacher,
          newLocation: this.state.newLocation,
          newSlotDay: this.state.newDay,
          newSlotStart: this.state.newStart,
          newSlotEnd: this.state.newEnd
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
        alert(response.data);
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

  handleDelete = (event) => {
    event.preventDefault();
    if (this.state.course === "" || this.state.day === "" || this.state.start === "" || this.state.location === "") {
      alert("You have to select a course, a day, a slot start time and a location to identify which slot you wish to delete");
    }
    else {
      axios
      .post(
        "http://localhost:3000/deleteCourseSlot",
        {
          courseName: this.state.course,
          location: this.state.location,
          slotDay: this.state.day,
          slotStart: this.state.start
        },
        {
          headers: { "auth-token": this.state.token }
        }
      )
      .then((response) => {
        alert(response.data);
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
            
    <Form>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Course"
      id="input-group-dropdown-1"
      onSelect={this.handleCourse}
    >
    {this.state.courses.map(course => {
      return <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>
    })}
    </DropdownButton>
  </InputGroup>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Day"
      id="input-group-dropdown-1"
      onSelect={this.handleDay}
      style={{marginRight:"10px"}}
    >
    <Dropdown.Item key="Saturday" eventKey="Saturday">Saturday</Dropdown.Item>
    <Dropdown.Item key="Sunday" eventKey="Sunday">Sunday</Dropdown.Item>
    <Dropdown.Item key="Monday" eventKey="Monday">Monday</Dropdown.Item>
    <Dropdown.Item key="Tuesday" eventKey="Tuesday">Tuesday</Dropdown.Item>
    <Dropdown.Item key="Wednesday" eventKey="Wednesday">Wednesday</Dropdown.Item>
    <Dropdown.Item key="Thursday" eventKey="Thursday">Thursday</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="New Slot Day"
      id="input-group-dropdown-1"
      onSelect={this.handleNewSlotDay}
    >
   <Dropdown.Item key="Saturday" eventKey="Saturday">Saturday</Dropdown.Item>
    <Dropdown.Item key="Sunday" eventKey="Sunday">Sunday</Dropdown.Item>
    <Dropdown.Item key="Monday" eventKey="Monday">Monday</Dropdown.Item>
    <Dropdown.Item key="Tuesday" eventKey="Tuesday">Tuesday</Dropdown.Item>
    <Dropdown.Item key="Wednesday" eventKey="Wednesday">Wednesday</Dropdown.Item>
    <Dropdown.Item key="Thursday" eventKey="Thursday">Thursday</Dropdown.Item>
    </DropdownButton>
  </InputGroup>

  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="Start"
      id="input-group-dropdown-1"
      onSelect={this.handleStart}
      style={{marginRight:"10px"}}
    >
  <Dropdown.Item key="8:15" eventKey="8:15">8:15</Dropdown.Item>
    <Dropdown.Item key="10:00" eventKey="10:00">10:00</Dropdown.Item>
    <Dropdown.Item key="11:45" eventKey="11:45">11:45</Dropdown.Item>
    <Dropdown.Item key="1:45" eventKey="1:45">1:45</Dropdown.Item>
    <Dropdown.Item key="3:45" eventKey="3:45">3:45</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      as={InputGroup.Prepend}
      variant="secondary"
      title="New Slot Start"
      id="input-group-dropdown-1"
      onSelect={this.handleNewSlotStart}
    >
   <Dropdown.Item key="8:15" eventKey="8:15">8:15</Dropdown.Item>
    <Dropdown.Item key="10:00" eventKey="10:00">10:00</Dropdown.Item>
    <Dropdown.Item key="11:45" eventKey="11:45">11:45</Dropdown.Item>
    <Dropdown.Item key="1:45" eventKey="1:45">1:45</Dropdown.Item>
    <Dropdown.Item key="3:45" eventKey="3:45">3:45</Dropdown.Item>
    </DropdownButton>
  </InputGroup>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Location</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder=""
      aria-label=""
      aria-describedby="basic-addon2"
      onChange={this.handleLocation}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>New Location</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="In case of updating location"
      aria-label="In case of updating location"
      aria-describedby="basic-addon2"
      onChange={this.handleNewLocation}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>New Teacher</Form.Label>
    <Form.Row>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="In case of updating teacher"
      aria-label="In case of updating teacher"
      aria-describedby="basic-addon2"
      onChange={this.handleNewTeacher}
    />
  </InputGroup>
  </Form.Row>
  </Form.Group>

  <Button variant="primary" style={{marginRight:"10px"}} onClick={this.handleAdd}>
    Add
  </Button>

  <Button variant="success" style={{marginRight:"10px"}} onClick={this.handleUpdate}>
    Update
  </Button>

  <Button variant="danger" onClick={this.handleDelete}>
    Delete
  </Button>

</Form>
            </div>
        )
    }
}

export default ModifyCourseSlot
