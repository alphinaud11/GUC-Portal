import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class RemoveSlotAssignment extends Component
{
    constructor() 
    {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          courses: [],
          assignedSlots: [],
          course: "",
          teacher: "",
          start: "",
          end: "",
          location: "",
          day: "",
          result: "",
          expired: false
        };
    }


    componentDidMount()
    {
        axios
            .get("http://localhost:3000/viewCourses", {
                headers: {"auth-token": this.state.token}
            })
            .then((response) => {
                console.log(response);
                this.setState({
                  isLoading: false,
                  courses: response.data
                });
              })
              .catch((err) => {
                console.log(err.response.data);
                if (err.response.data === "Invalid Token") {
                  alert("Your credentials are expired, login again");
                  this.setState({
                    expired: true,
                  });
                }
              });
    }

    render() 
    {
        return this.state.expired === true ? (
            <Redirect to="/login" />
          ) : this.state.isLoading === true ? (
            <Spinner
              size="xl"
              style={{ marginLeft: "50%", marginTop: "10%" }}
              animation="border"
            />
          ) : (
            <div style={{marginLeft:"25px", marginTop:"25px"}}>
                <InputGroup className="mb-3">
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="courses" id="input-group-dropdown-1" onSelect={this.courseChange}>
                       {this.state.courses.map((course) => {
                        return <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </InputGroup>
                <br></br>
                <InputGroup className="mb-3">
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="assigned slots" id="input-group-dropdown-2" onSelect={this.slotChange}>
                        {this.state.assignedSlots.map((slot, index) => {
                            return <Dropdown.Item key={index} eventKey={index}>{slot.day}, {slot.location}, {slot.start}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </InputGroup>
                <br></br>
                <button type="button" class="btn btn-secondary" onClick={this.removeAssignment}>Remove Assignment</button>
                <br></br>
                <div style={{marginLeft:"25px", marginTop:"25px"}}>
                  <h2>{this.state.result}</h2>
                </div>
            </div>    
          );
    }

    courseChange = (event) => {
        this.setState({
            course: event,
            start: "",
            end: "",
            location: "",
            day: "",
            teacher: "",
            assignedSlots: [],
            result: ""
        });
      
      axios
        .post(
          "http://localhost:3000/viewAssignedSlots",
          {
            course: event
          },
          {
            headers: { "auth-token": this.state.token }
          }
        )
        .then((response) => {
          console.log(response);
          this.setState({
            assignedSlots: response.data
          });
          console.log(this.state.assignedSlots);
          console.log("Successful")
        })
        .catch((err) => {
          console.log(err);
        });
    }

    slotChange = (event) => {
        console.log(event);
        const index = event;
        this.setState({
            start: this.state.assignedSlots[index].start,
            end: this.state.assignedSlots[index].end,
            location: this.state.assignedSlots[index].location,
            day: this.state.assignedSlots[index].day,
            teacher: this.state.assignedSlots[index].teacher
        });
        console.log(this.state.start);
        console.log(this.state.end);
        console.log(this.state.location);
        console.log(this.state.day);
        console.log(this.state.teacher);
        console.log("Successful");
    }

    removeAssignment = (event) => {
        axios
            .post(
                "http://localhost:3000/removeSlotAssignment",
                {
                    course: this.state.course,
                    start: this.state.start,
                    end: this.state.end,
                    location: this.state.location,
                    day: this.state.day,
                    teacher: this.state.teacher
                },
                {
                    headers: { "auth-token": this.state.token }
                }
            )
            .then((response) => {
                console.log(this.state.start);
                console.log(this.state.end);
                console.log(this.state.location);
                console.log(this.state.day);
                console.log(this.state.teacher);
                console.log(this.state.course);
                console.log(response);
                this.setState({
                result: response.data
                });
                console.log("Successful")
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default RemoveSlotAssignment;